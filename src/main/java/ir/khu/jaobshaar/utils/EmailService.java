package ir.khu.jaobshaar.utils;

import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {
    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String to,String subject,String text){
        SimpleMailMessage mailMessage=new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(text);

        javaMailSender.send(mailMessage);
    }

    public void sendEmailWithAttachment(String to,String subject,String text,String url) throws MessagingException {
        MimeMessage mimeMessage=javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper= new MimeMessageHelper(mimeMessage,true);
        mimeMessageHelper.setTo(to);
        mimeMessageHelper.setSubject(subject);
        mimeMessageHelper.setText(text);

        ClassPathResource classPathResource= new ClassPathResource(url);
        mimeMessageHelper.addAttachment(classPathResource.getFilename(),classPathResource);

        javaMailSender.send(mimeMessage);
    }

    public void sendEmailWithLink(String to,String subject,String text,String url) throws  MessagingException {
        MimeMessage mimeMessage=javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper= new MimeMessageHelper(mimeMessage,true);
        mimeMessageHelper.setTo(to);
        mimeMessageHelper.setSubject(subject);

        String html = text+"\n" + "\n<a href=\'"+url+"\'>"+url+"</a>";
        mimeMessage.setText(html, "UTF-8", "html");

        javaMailSender.send(mimeMessage);
    }
}
