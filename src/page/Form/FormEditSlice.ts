import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { OptionType } from '../../common/type';
export interface FieldChange {
    fieldName: string;
    fieldValue?: string | number | boolean | OptionType;
}

export interface FormEdit {
    input2?: string;
    input17?: number;
    input62?: string;
    input32?: number;
    input77?: string;
    input77TreeData?: OptionType[];
}

export interface ReduxData {
    FormEdit: FormEdit;
}

const initialState: ReduxData = {
    FormEdit:{
        input2: 'standard'
    }
};

export const FormEditSlice = createSlice({
    name: 'FormEdit',
    initialState,
    reducers: {
        changeField: (state, action: PayloadAction<FieldChange>) => {
            (state.FormEdit as any)[action.payload.fieldName] = action.payload.fieldValue
        },
    },
});

export const formEdit = (state: RootState) => state.formEdit;
export const { changeField } = FormEditSlice.actions
export default FormEditSlice.reducer;

