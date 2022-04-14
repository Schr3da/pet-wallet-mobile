import { BaseRepository } from '../repository/BaseRepository';
import { NewsletterRegistration } from '../entity/newsletterRegistration';

export class NewsletterRegistrationRepository extends BaseRepository<NewsletterRegistration> {

    public constructor(rawRepository: any) {
        super(rawRepository);
    }

    register = async (email: string, comment: string): Promise<NewsletterRegistration> => {
        let registration: NewsletterRegistration = new NewsletterRegistration();
        registration.id = this.generateUUID();
        registration.email = email;
        registration.text = comment;
        return await this.create(registration);
    }

    numOfRegistrations = async () => {
        return await this.rawRepository.createQueryBuilder('newsletterRegistration').select('id').getCount();
    }

    findRegistrationByMail = async (email: string): Promise<NewsletterRegistration> => {
        return await this.rawRepository
            .createQueryBuilder('newsletterRegistration')
            .where("newsletterRegistration.email = :email", { email: email }).getOne();
    }
}