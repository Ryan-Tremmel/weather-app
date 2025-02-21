export default function Toggle({
  unitOfMeasurement,
  handleUnitOfMeasurementChange,
}) {
  return (
    <div className="form__toggle">
      <label className="form__toggle-label-fahrenheit" htmlFor={'toggle'}>
        Fahrenheit
      </label>
      <input
        id="toggle"
        type="checkbox"
        checked={unitOfMeasurement === 'metric'}
        onChange={handleUnitOfMeasurementChange}
      />
      <label className="form__toggle-switch" htmlFor="toggle"></label>
      <label className="form__toggle-label-celsius" htmlFor={'toggle'}>
        Celsius
      </label>
    </div>
  );
}
