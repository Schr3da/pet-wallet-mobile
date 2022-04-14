export interface NewsletterRegistrationRequest {
    email: string;
    text: string;
}
export interface NewsletterRegistrationResponse extends NewsletterRegistrationRequest {
    id: string;
}