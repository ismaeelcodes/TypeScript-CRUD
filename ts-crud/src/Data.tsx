// Importing Interface
import { Car } from "./interfaces";


// Makes of Cars
export const carMakesData: string[] = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Tesla'];



// dummy data for the drop down of models of the car
export const carModelsData: { 
    [make: string]: string[]  
} = { 

    Toyota: ['Corolla', 'Camry', 'RAV4'],

    Honda: ['Civic', 'Accord', 'CR-V'],

    Ford: ['F-150', 'Mustang', 'Escape'],

    Chevrolet: ['Silverado', 'Camaro', 'Equinox'],

    Tesla: ['Model X', 'Model S', 'Model 3']

  };




// Our Card Data in the Structure of our Car Interface
export const registerCarsData: Car[] = [
    { id: 1, registrationNumber: 'ABC-123', color: 'red', model: 'Model X', make: 'Tesla' },
    { id: 2, registrationNumber: 'DEF-456', color: 'blue', model: 'Model S', make: 'Tesla' },
    { id: 3, registrationNumber: 'GHI-789', color: 'green', model: 'Model 3', make: 'Tesla' },
  ];