import { useCallback, useEffect, useState } from 'react';
import data from './MOCK_DATA.json';

export default function Problem6() {
  const [cars, setCars] = useState(data);
  const [selected, setSelected] = useState(null); // Initially, no car is selected
  const [formValues, setFormValues] = useState({
    vin: '',
    make: '',
    model: '',
    year: '',
    color: ''
  });

  // Update form values when a car is selected for editing
  const handleEdit = useCallback((car) => {
    setSelected(car);
    setFormValues({
      vin: car.vin,
      make: car.make,
      model: car.model,
      year: car.year,
      color: car.color
    });
  }, []);

  // Handle deleting a car
  const handleDelete = useCallback((vin) => {
    setCars((prevCars) => prevCars.filter((car) => car.vin !== vin));
  }, []);

  // Save a new car to the list
  const handleSave = useCallback(() => {
    const newCar = {
      vin: formValues.vin,
      make: formValues.make,
      model: formValues.model,
      year: formValues.year,
      color: formValues.color
    };
    setCars((prevCars) => [...prevCars, newCar]);
    setFormValues({ vin: '', make: '', model: '', year: '', color: '' }); // Clear form
  }, [formValues]);

  // Update the selected car with the new values from the form
  const handleUpdate = useCallback(() => {
    if (selected) {
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.vin === selected.vin ? { ...selected, ...formValues } : car
        )
      );
      setSelected(null); // Deselect after updating
      setFormValues({ vin: '', make: '', model: '', year: '', color: '' }); // Clear form
    }
  }, [selected, formValues]);

  // Clear form values
  const handleClear = useCallback(() => {
    setFormValues({ vin: '', make: '', model: '', year: '', color: '' });
    setSelected(null); // Deselect if any car is selected
  }, []);

  return (
    <>
      <div>
        <div style={{ display: 'block' }}>
          VIN:{' '}
          <input
            type="text"
            value={formValues.vin}
            onChange={(e) => setFormValues({ ...formValues, vin: e.target.value })}
          />
        </div>
        <div style={{ display: 'block' }}>
          Make:{' '}
          <input
            type="text"
            value={formValues.make}
            onChange={(e) => setFormValues({ ...formValues, make: e.target.value })}
          />
        </div>
        <div style={{ display: 'block' }}>
          Model:{' '}
          <input
            type="text"
            value={formValues.model}
            onChange={(e) => setFormValues({ ...formValues, model: e.target.value })}
          />
        </div>
        <div style={{ display: 'block' }}>
          Year:{' '}
          <input
            type="text"
            value={formValues.year}
            onChange={(e) => setFormValues({ ...formValues, year: e.target.value })}
          />
        </div>
        <div style={{ display: 'block' }}>
          Color:{' '}
          <input
            type="text"
            value={formValues.color}
            onChange={(e) => setFormValues({ ...formValues, color: e.target.value })}
          />
        </div>
        <button type="button" onClick={handleSave}>Save</button>
        <button type="button" onClick={handleClear}>Clear</button>
        {selected && <button type="button" onClick={handleUpdate}>Update</button>}
      </div>

      <div className="table-container">
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>VIN</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Color</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {cars.map((car) => (
              <tr key={car.vin}>
                <td>{car.vin}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.color}</td>
                <td>
                  <button type="button" onClick={() => handleEdit(car)}>Edit</button>
                  <button type="button" onClick={() => handleDelete(car.vin)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
