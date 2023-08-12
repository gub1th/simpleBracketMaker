//this is the data that is actualy stored/passed along. multiple fields (like name, age) make up a single, complete 'data point'
export interface Field {
    value: string | number;
    isDisplayNameField: boolean;
  }

export interface Team {
    teamName: Field;
    member1: Field;
    member2: Field;
}

export interface Match {
    team1: Team | null;
    team2: Team | null;
}

export interface formFieldValidation {
    required: boolean;
    pattern?: RegExp;
    errorMsg?: string;
}
// this field only exists within a form
export interface formField {
    isDisplayNameField: boolean;
    name: string;
    label: string;
    validation: formFieldValidation;
}

export interface Player {
    pName: Field;
    pAge: Field;
    pHeight: Field;
}