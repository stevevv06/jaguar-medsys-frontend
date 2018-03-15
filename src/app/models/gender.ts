export class Gender {
    id: string;
    gender: string;
    created: string;
    modified: string;

    constructor(
        gender: any
    ){
        this.id = gender.id;
        this.gender = gender.gender;        
        this.created = gender.created;
        this.modified = gender.modified;
    };

    public isNew() : boolean{
        let ret: boolean = true;
        if(this.id != null && this.id.length > 0){
            ret = false;
        }
        return ret;
    };
}
