import { FieldErrors, FieldValues } from "react-hook-form";

//[ ] Función utilizada para buscar errores asociados a un input en particular
// Recibe como parámetros un objeto de errores y el nombre del input
export const findInputError = (errors: FieldErrors<FieldValues>, name: string): { error: { message: string } } => {
    const filter = Object.keys(errors)
        .filter((key) => key.includes(name))
        .reduce((cur, key) => {
            return Object.assign(cur, { error: errors[key] })
        }, {} as { error: { message: string } });
    return filter
}