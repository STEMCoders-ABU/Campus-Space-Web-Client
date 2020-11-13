const { FormControl, InputLabel, Select } = require("@material-ui/core");
const { useField } = require("formik");

const FormikSelect = ({label, children, ...props}) => {
    const [field, meta] = useField(props);
  
    return (
      <>
        <FormControl variant="filled" style={{width: '100%', marginBottom: '1rem' }} className="w-100 my-3">
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                {...field}
                {...props}
                error={meta.touched && meta.error ? true : false}
                helperText={meta.touched ? meta.error : ''}
            >
            {children}
            </Select>
        </FormControl>
      </>
    );
};

export default FormikSelect;