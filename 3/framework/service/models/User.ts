interface Profile {
    boardView: string;
    templatesBoardId: string;
    cardTemplatesSwimlaneId: string;
    listTemplatesSwimlaneId: string;
    boardTemplatesSwimlaneId: string;
};

interface Services {
    password: {
        bcrypt: string;
    };
    email: {
        verificationTokens: {
            token: string;
            address: string;
            when: Date;
        }[];
    };
    resume: {
        loginTokens: {
            when: Date;
            hashedToken: string;
        }[];
    };
};
export interface User {
    _id: string;
    createdAt: Date;
    services: any
    username: string;
    emails: {
        address: string;
        verified: boolean;
    }[];
    profile: Profile
    authenticationMethod: string;
    isAdmin?: boolean;
}