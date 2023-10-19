export type MacroData = {
    calories: {
        target: number;
        result: number;
    };
    proteins: {
        target: number;
        result: number;
    };
    carbs: {
        target: number;
        result: number;
    };
    fats: {
        target: number;
        result: number;
    };
};

export type MacroBoxProps = {
    title: string;
    result: number;
    target: number;
    className?: string;
};

export type DateProps = {
    date: string;
    onPrev: () => void;
    onNext: () => void;
}

export type FormProps = {
    heading: string;
    onSave: (data: FormInput) => void;
    setPress: (pressed: boolean) => void;
};

export type FormInput = {
    calories: string;
    proteins: string;
    carbs: string;
    fats: string;
}