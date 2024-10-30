import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import { motion } from 'framer-motion';

const Hero = () => {
  const [value, setValue] = React.useState('metric');
  const [weight, setWeight] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [bmi, setBmi] = React.useState(0);
  const [idealWeightRange, setIdealWeightRange] = React.useState({
    min: 0,
    max: 0,
  });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleHeightChange = (event) => {
    const newHeight = event.target.value;
    setHeight(newHeight);
    calculateBMI(newHeight, weight);
    calculateIdealWeightRange(newHeight); // Met à jour l'intervalle de poids idéal
  };

  const handleWeightChange = (event) => {
    const newWeight = event.target.value;
    setWeight(newWeight);
    calculateBMI(height, newWeight);
  };

  const calculateBMI = (height, weight) => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const calculatedBmi = weight / (heightInMeters * heightInMeters);
      setBmi(calculatedBmi.toFixed(2));
    }
  };

  // Fonction pour calculer l'intervalle de poids idéal
  const calculateIdealWeightRange = (height) => {
    const heightInMeters = height / 100;
    const minWeight = 18.5 * heightInMeters ** 2;
    const maxWeight = 24.9 * heightInMeters ** 2;
    setIdealWeightRange({
      min: minWeight.toFixed(1),
      max: maxWeight.toFixed(1),
    });
  };

  return (
    <>
      <div className="bg-gradient-to-r lg:w-8/12 w-full flex justify-start from-customWhite from-5% rounded-br-3xl via-blue-200 via-80% to-blue-300 to-95% h-1/3 p-24">
        <div className="w-8/12 lg:w-3/5 flex flex-col justify-center items-center mx-auto lg:items-start lg:ml-0">
          <h1 className="font-bold text-5xl mb-5 text-center lg:text-left w-9/12">
            Body Mass Index Calculator
          </h1>
          <p className="text-gray-500 text-base text-center lg:text-left">
            Better understand your weight in relation to your height using our
            body mass index (BMI) calculator. While BMI is not the sole
            determinant of a healthy weight, it offers a valuable starting point
            to evaluate your overall health and well-being.
          </p>
        </div>
      </div>

      {/* BMI Form */}
      <div className="bg-white w-full lg:w-4/12 mt-10 lg:right-28 lg:top-0 absolute mx-auto p-8 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Enter your details below
        </h2>
        {/* Metric or Imperial radio buttons */}
        <div className="flex flex-row justify-between mb-6">
          <FormControl component="fieldset">
            <RadioGroup
              aria-labelledby="measurement-system-radio-group"
              name="measurement-system"
              value={value}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="imperial"
                control={<Radio color="primary" />}
                label="Imperial"
              />
              <FormControlLabel
                value="metric"
                control={<Radio color="primary" />}
                label="Metric"
              />
            </RadioGroup>
          </FormControl>
        </div>

        {/* Inputs */}
        <div className="flex flex-col items-center">
          <div className="flex flex-row justify-between">
            <FormControl sx={{ m: 1, width: '45%' }} variant="outlined">
              <FormHelperText id="outlined-height-helper-text">
                Height
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-height"
                endAdornment={
                  <InputAdornment position="end">cm</InputAdornment>
                }
                onChange={handleHeightChange}
                value={height}
                aria-describedby="outlined-height-helper-text"
                inputProps={{ 'aria-label': 'height' }}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: '45%' }} variant="outlined">
              <FormHelperText id="outlined-weight-helper-text">
                Weight
              </FormHelperText>
              <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={
                  <InputAdornment position="end">kg</InputAdornment>
                }
                onChange={handleWeightChange}
                value={weight}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{ 'aria-label': 'weight' }}
              />
            </FormControl>
          </div>

          {/* BMI Result and Feedback */}
          {bmi > 0 ? (
            <div className="mt-6 bg-blue-700 text-white p-10 flex flex-row justify-center align-baseline rounded-md rounded-r-full w-full">
              <div className="flex flex-col gap-4 w-2/4">
                <h2 className="font-bold text-l">Your BMI is ...</h2>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <span className="text-4xl font-bold">{bmi}</span>
                </motion.div>
              </div>
              <p className="text-sm w-2/5">
                {bmi < 18.5 && (
                  <>
                    You are{' '}
                    <span className="font-bold text-green-500">
                      underweight.
                    </span>{' '}
                    A healthy weight range might be around{' '}
                    <span>{idealWeightRange.min} kgs</span> -{' '}
                    <span>{idealWeightRange.max} kgs</span>.
                  </>
                )}
                {bmi >= 18.5 && bmi < 25 && (
                  <>
                    Your BMI suggests you are a{' '}
                    <span className="font-bold text-green-500">
                      healthy weight.
                    </span>{' '}
                    Your ideal weight is between{' '}
                    <span>{idealWeightRange.min} kgs</span> -{' '}
                    <span>{idealWeightRange.max} kgs</span>.
                  </>
                )}
                {bmi >= 25 && bmi < 30 && (
                  <>
                    You are{' '}
                    <span className="font-semibold text-orange-300">
                      overweight.
                    </span>{' '}
                    A healthier weight range could be{' '}
                    <span>{idealWeightRange.min} kgs</span> -{' '}
                    <span>{idealWeightRange.max} kgs</span>.
                  </>
                )}
                {bmi >= 30 && bmi < 35 && (
                  <>
                    You are in{' '}
                    <span className="font-bold text-orange-600">
                      Class 1 obesity.
                    </span>{' '}
                    Consider aiming for a weight between{' '}
                    <span>{idealWeightRange.min} kgs</span> -{' '}
                    <span>{idealWeightRange.max} kgs</span>.
                  </>
                )}
                {bmi >= 35 && bmi < 40 && (
                  <>
                    You are in{' '}
                    <span className="font-bold text-red-500">
                      Class 2 obesity.
                    </span>{' '}
                    A healthy weight range might be around{' '}
                    <span>{idealWeightRange.min} kgs</span> -{' '}
                    <span>{idealWeightRange.max} kgs</span>.
                  </>
                )}
                {bmi >= 40 && (
                  <>
                    You are in{' '}
                    <span className="font-bold text-red-700">
                      Class 3 obesity (morbid obesity).
                    </span>{' '}
                    A healthier weight range could be{' '}
                    <span>{idealWeightRange.min} kgs</span> -{' '}
                    <span>{idealWeightRange.max} kgs</span>.
                  </>
                )}
              </p>
            </div>
          ) : (
            <div className="mt-6 bg-blue-700 text-white p-4 rounded-md rounded-r-full w-full">
              <h2 className="font-bold text-xl">Your BMI Result</h2>
              <p className="text-sm">
                Enter your height and weight, and you&apos;ll see your BMI
                result here.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Hero;
