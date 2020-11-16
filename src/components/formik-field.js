const { TextField } = require("@material-ui/core");
const { useField } = require("formik");

const FormikField = ({label, ...props}) => {
    const [field, meta] = useField(props);
  
    return (
      <>
        <TextField
          style={{width: '100%', marginBottom: '1rem' }}
          label={label}
          {...field}
          {...props}
          error={meta.touched && meta.error ? true : false}
          helperText={meta.touched ? meta.error : ''}
        />
      </>
    );
};

export default FormikField;