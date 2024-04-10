import './Checkbox.css'

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <div className="pt-2 flex mt-2 items-center" >
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