export const insertMaskCep = (cep) => {
    return cep.replace(/(\d{5})(\d)/, '$1-$2')
}