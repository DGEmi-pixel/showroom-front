import { Dispatch, SetStateAction } from 'react';

interface StatePair {
    value: string;
    setter: Dispatch<SetStateAction<string>>;
}

export interface ModalProps {
    modalTitle: string,
    qty: number,
    methods: StatePair[]
} 