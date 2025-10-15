import {
  calculate1RMBrzycki,
  calculate1RMEpley,
  calculate1RMLombardi,
  calculate1RMOConnor,
  calculateAverage1RM,
  calculateTrainingPercentages,
  calculatePlates,
  SOUTH_AFRICAN_PLATE_CONFIG,
  AMERICAN_PLATE_CONFIG,
  calculateWilksScore,
  calculateGLPoints,
} from '../calculations';

describe('1RM Calculations', () => {
  describe('calculate1RMBrzycki', () => {
    it('should return the same weight for 1 rep', () => {
      expect(calculate1RMBrzycki(100, 1)).toBe(100);
    });

    it('should calculate 1RM for multiple reps', () => {
      expect(calculate1RMBrzycki(100, 5)).toBe(117);
      expect(calculate1RMBrzycki(80, 8)).toBe(100);
    });

    it('should return 0 for invalid reps', () => {
      expect(calculate1RMBrzycki(100, 0)).toBe(0);
      expect(calculate1RMBrzycki(100, -1)).toBe(0);
    });
  });

  describe('calculate1RMEpley', () => {
    it('should return the same weight for 1 rep', () => {
      expect(calculate1RMEpley(100, 1)).toBe(100);
    });

    it('should calculate 1RM for multiple reps', () => {
      expect(calculate1RMEpley(100, 5)).toBe(117);
      expect(calculate1RMEpley(80, 8)).toBe(101);
    });

    it('should return 0 for invalid reps', () => {
      expect(calculate1RMEpley(100, 0)).toBe(0);
      expect(calculate1RMEpley(100, -1)).toBe(0);
    });
  });

  describe('calculate1RMLombardi', () => {
    it('should return the same weight for 1 rep', () => {
      expect(calculate1RMLombardi(100, 1)).toBe(100);
    });

    it('should calculate 1RM for multiple reps', () => {
      expect(calculate1RMLombardi(100, 5)).toBe(107);
      expect(calculate1RMLombardi(80, 8)).toBe(92);
    });

    it('should return 0 for invalid reps', () => {
      expect(calculate1RMLombardi(100, 0)).toBe(0);
      expect(calculate1RMLombardi(100, -1)).toBe(0);
    });
  });

  describe('calculate1RMOConnor', () => {
    it('should return the same weight for 1 rep', () => {
      expect(calculate1RMOConnor(100, 1)).toBe(100);
    });

    it('should calculate 1RM for multiple reps', () => {
      expect(calculate1RMOConnor(100, 5)).toBe(113);
      expect(calculate1RMOConnor(80, 8)).toBe(96);
    });

    it('should return 0 for invalid reps', () => {
      expect(calculate1RMOConnor(100, 0)).toBe(0);
      expect(calculate1RMOConnor(100, -1)).toBe(0);
    });
  });

  describe('calculateAverage1RM', () => {
    it('should return the same weight for 1 rep', () => {
      expect(calculateAverage1RM(100, 1)).toBe(100);
    });

    it('should calculate average 1RM for multiple reps', () => {
      expect(calculateAverage1RM(100, 5)).toBe(114);
      expect(calculateAverage1RM(80, 8)).toBe(97);
    });

    it('should return 0 for invalid reps', () => {
      expect(calculateAverage1RM(100, 0)).toBe(0);
      expect(calculateAverage1RM(100, -1)).toBe(0);
    });
  });
});

describe('Training Percentages', () => {
  it('should calculate training percentages based on 1RM', () => {
    const percentages = calculateTrainingPercentages(100);
    
    expect(percentages['55%']).toBe(55);
    expect(percentages['60%']).toBe(60);
    expect(percentages['65%']).toBe(65);
    expect(percentages['70%']).toBe(70);
    expect(percentages['75%']).toBe(75);
    expect(percentages['80%']).toBe(80);
    expect(percentages['85%']).toBe(85);
    expect(percentages['90%']).toBe(90);
    expect(percentages['95%']).toBe(95);
  });

  it('should handle non-round 1RM values', () => {
    const percentages = calculateTrainingPercentages(87.5);
    
    expect(percentages['55%']).toBe(48);
    expect(percentages['60%']).toBe(53);
    expect(percentages['65%']).toBe(57);
    expect(percentages['70%']).toBe(61);
    expect(percentages['75%']).toBe(66);
    expect(percentages['80%']).toBe(70);
    expect(percentages['85%']).toBe(74);
    expect(percentages['90%']).toBe(79);
    expect(percentages['95%']).toBe(83);
  });
});

describe('Plate Calculations', () => {
  describe('South African Plate Configuration', () => {
    it('should calculate plates for common weights', () => {
      const result = calculatePlates(100, SOUTH_AFRICAN_PLATE_CONFIG);
      
      expect(result.totalWeight).toBe(100);
      expect(result.barWeight).toBe(20);
      expect(result.unit).toBe('kg');
      expect(result.plates).toContainEqual({ weight: 20, count: 1 });
      expect(result.plates).toContainEqual({ weight: 5, count: 1 });
    });

    it('should calculate plates for maximum weight', () => {
      const result = calculatePlates(240, SOUTH_AFRICAN_PLATE_CONFIG);
      
      expect(result.totalWeight).toBe(240);
      expect(result.plates).toContainEqual({ weight: 25, count: 1 });
      expect(result.plates).toContainEqual({ weight: 20, count: 1 });
      expect(result.plates).toContainEqual({ weight: 15, count: 1 });
      expect(result.plates).toContainEqual({ weight: 10, count: 1 });
      expect(result.plates).toContainEqual({ weight: 5, count: 1 });
    });

    it('should handle weight less than bar weight', () => {
      const result = calculatePlates(15, SOUTH_AFRICAN_PLATE_CONFIG);
      
      expect(result.totalWeight).toBe(20);
      expect(result.plates).toEqual([]);
      expect(result.remainingWeight).toBe(-5);
    });

    it('should handle exact bar weight', () => {
      const result = calculatePlates(20, SOUTH_AFRICAN_PLATE_CONFIG);
      
      expect(result.totalWeight).toBe(20);
      expect(result.plates).toEqual([]);
      expect(result.remainingWeight).toBe(0);
    });

    it('should handle weight with remaining fraction', () => {
      const result = calculatePlates(101, SOUTH_AFRICAN_PLATE_CONFIG);
      
      expect(result.totalWeight).toBe(100);
      expect(result.remainingWeight).toBe(1);
    });
  });

  describe('American Plate Configuration', () => {
    it('should calculate plates for common weights', () => {
      const result = calculatePlates(135, AMERICAN_PLATE_CONFIG);
      
      expect(result.totalWeight).toBe(135);
      expect(result.barWeight).toBe(45);
      expect(result.unit).toBe('lb');
      expect(result.plates).toContainEqual({ weight: 45, count: 1 });
    });

    it('should calculate plates for heavier weights', () => {
      const result = calculatePlates(225, AMERICAN_PLATE_CONFIG);
      
      expect(result.totalWeight).toBe(225);
      expect(result.plates).toContainEqual({ weight: 45, count: 2 });
      expect(result.plates).toContainEqual({ weight: 10, count: 1 });
      expect(result.plates).toContainEqual({ weight: 5, count: 1 });
      expect(result.plates).toContainEqual({ weight: 2.5, count: 1 });
    });
  });
});

describe('Wilks Score Calculations', () => {
  it('should calculate Wilks score for male lifter', () => {
    const score = calculateWilksScore(83, 500, 'male');
    
    expect(score).toBeCloseTo(320.45, 2);
  });

  it('should calculate Wilks score for female lifter', () => {
    const score = calculateWilksScore(63, 300, 'female');
    
    expect(score).toBeCloseTo(341.72, 2);
  });

  it('should handle different body weights', () => {
    const score1 = calculateWilksScore(70, 400, 'male');
    const score2 = calculateWilksScore(100, 400, 'male');
    
    expect(score1).toBeGreaterThan(score2);
  });
});

describe('GL Points Calculations', () => {
  it('should calculate GL points for male lifter', () => {
    const points = calculateGLPoints(83, 500, 'male', 'raw');
    
    expect(points).toBeGreaterThan(0);
  });

  it('should calculate GL points for female lifter', () => {
    const points = calculateGLPoints(63, 300, 'female', 'raw');
    
    expect(points).toBeGreaterThan(0);
  });

  it('should differentiate between raw and equipped', () => {
    const rawPoints = calculateGLPoints(83, 500, 'male', 'raw');
    const equippedPoints = calculateGLPoints(83, 500, 'male', 'equipped');
    
    expect(equippedPoints).toBeGreaterThan(rawPoints);
  });

  it('should differentiate between male and female', () => {
    const malePoints = calculateGLPoints(83, 500, 'male', 'raw');
    const femalePoints = calculateGLPoints(83, 500, 'female', 'raw');
    
    expect(malePoints).toBeGreaterThan(femalePoints);
  });
});