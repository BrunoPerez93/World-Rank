import './Checkbox.css'

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <div className="pt-2 flex items-center w-full" >
      <input
        className="mr-5 custom-checkbox"
        type="checkbox"
        id={label}
        checked={checked}
        onChange={onChange}
      />
      <label className="text-custom-light-white cursor-pointer" htmlFor={label}>{label}</label>
    </div>
  );
};

export default Checkbox;