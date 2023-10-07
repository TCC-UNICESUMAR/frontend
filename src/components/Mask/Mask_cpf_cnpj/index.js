export const insertMaskCpfCnpj = (value) => {
    const noMask = value.replace(/\D/g, '');
    const { length } = noMask;

    console.log(length);

    if (length == 11) {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    }else if(length == 14){
       return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/g, '$1.$2.$3/$4-');
    }
}