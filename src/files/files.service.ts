import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";
import { InjectModel } from "@nestjs/sequelize";
import { File } from "./file.model";


@Injectable()
export class FilesService {
  constructor(@InjectModel(File) private fileRepository: typeof File) {
  }

  async createFile(file, fileName, essenceId: number, essenceTable: string): Promise<string> {
    try {
      if (!fileName) {
        fileName = uuid.v4() + ".jpg";
      }

      const filePath = path.resolve(__dirname, "..", "static");

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      await this.fileRepository.create({ fileName: fileName, essenceId: essenceId, essenceTable: essenceTable });
      return fileName;

    } catch (e) {
      throw new HttpException("File writing error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async deleteFile(fileName: string) {

    const filePath = path.resolve(__dirname, "..", "static");
    fs.unlink(path.join(filePath, fileName), () => console.log(`File ${fileName} was deleted`));

    if (await this.fileRepository.findOne({where:{fileName}}))
      await this.fileRepository.destroy({ where: { fileName } });

    return `File ${fileName} was deleted`;
  }

  async clearOldUnusedFiles() {

    // засекам один час
    const { Op } = require("sequelize");
    const delta = new Date(Date.now() - 60 * 60 * 1000);

    // массив с записями старше часа
    const arr1 = await this.fileRepository.findAll({
      where: {
        createdAt: { [Op.lt]: delta }
      }
    });
    let arr11 = arr1.map((obj) => obj.fileName);

    // массив с записями, неиспользуемыми в таблицах
    const arr2 = await this.fileRepository.findAll({
      where: { essenceTable: null }
    });
    let arr22 = arr2.map((obj) => obj.fileName);

    // массив с записями, неиспользуемыми пользователями
    const arr3 = await this.fileRepository.findAll({
      where: { essenceId: null }
    });
    let arr33 = arr3.map((obj) => obj.fileName);

    // пересечение (коньюнкция) массивов 2 и 3 (не имеет таблиц и пользователей)
    let conArrs = arr22.filter(x => arr33.includes(x));

    // объединение получившегося массива с массивом просроченных файлов
    let resArr = [...new Set([...arr11, ...conArrs])];

    // проходим по массиву, удаляем файлы и соответствующие записи из базы
    resArr.map(async (fileName) => {
      await this.deleteFile(fileName)
      await this.fileRepository.destroy({ where: { fileName } });
    })

    return(`${resArr.length} files were deleted`);

  }

  async deleteUserFromFileTable(id){
    await this.fileRepository.update({essenceId:null},{where:{essenceId:id}})
  }
}


