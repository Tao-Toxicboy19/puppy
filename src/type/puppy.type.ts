export interface Puppy {
    id: number;
    puppyName: string;
    breed: string;
    imageUrl: string;
}


export interface CreatePuppy {
    message: string;
    puppy: Puppy;
}

