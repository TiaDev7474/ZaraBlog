import {Injectable} from "@nestjs/common";
import {MailerService} from "@nestjs-modules/mailer";


@Injectable()
export  class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(user: any){
        const url = "example.com";
        console.log("sending email address", user.email);

        await this.mailerService.sendMail({
            to: user.email,
            from: "rirynomenjanahary@gmail.com",
            subject:"Welcome to blog app",
            template:'./confirmation',
            context: {
                name: user.email,
                url
            }
        });
    }
}