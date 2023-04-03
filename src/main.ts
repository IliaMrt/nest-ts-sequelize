import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {
    // получаем порт из окружения или 8000
    const PORT = process.env.PORT || 8000;

    // создаём экземпляр приложения
    const app = await NestFactory.create(AppModule);

    // создаём экземпляр DocumentBuilder, который будет отвечать за документацию
    // приложения, и инициализируем его
    const config = new DocumentBuilder()
        .setTitle('Class NestJS')
        .setDescription('Documentation')
        .setVersion('1.0.0')
        .addTag('NEST')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    //   запуск сервера
    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start()
