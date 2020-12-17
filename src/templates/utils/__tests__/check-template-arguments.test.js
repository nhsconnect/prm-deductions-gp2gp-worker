const checkTemplateArguments = require('../check_params');

describe('checkTemplateArguments', () => {
  it('should throw error when input argument is undefined', () => {
    expect(() => checkTemplateArguments({ arg1: undefined })).toThrowError(
      'Check template parameter error: arg1 is undefined'
    );
  });

  it('should not throw error when input argument is defined', () => {
    expect(() => checkTemplateArguments({ arg1: 'something' })).not.toThrowError();
  });

  it('should throw error when input object is not of type object', () => {
    expect(() => checkTemplateArguments('string')).toThrowError('input object is not an object');
  });

  it('should throw error when input object is undefined', () => {
    expect(() => checkTemplateArguments()).toThrowError('input object is not an object');
  });

  it('should throw error for level one nested input objects', () => {
    expect(() => checkTemplateArguments({ patient: { arg1: undefined } })).toThrowError(
      'Check template parameter error: arg1 is undefined'
    );
  });

  it('should throw error that contains all fields that are undefined (one object)', () => {
    expect(() =>
      checkTemplateArguments({
        patient: { arg1: undefined, arg2: undefined }
      })
    ).toThrowError('Check template parameter error: arg1 is undefined, arg2 is undefined');
  });

  it('should throw error that contains all fields that are undefined', () => {
    expect(() =>
      checkTemplateArguments({
        patient: { arg1: undefined, arg2: undefined },
        sendingService: undefined
      })
    ).toThrowError(
      'Check template parameter error: arg1 is undefined, arg2 is undefined, sendingService is undefined'
    );
  });

  it('should throw error for level one nested input objects', () => {
    expect(() => checkTemplateArguments({ patient: { arg1: 'string' } })).not.toThrowError();
  });

  it('will throw error when max depth has been reached', () => {
    expect(() => checkTemplateArguments({ patient: { arg1: 'string' } }, 0)).toThrowError(
      'maxDepth reached, exiting'
    );
  });

  it('will not throw error when nested object is within max depth', () => {
    expect(() => checkTemplateArguments({ patient: { arg1: 'string' } }, 2)).not.toThrowError(
      'maxDepth reached, exiting'
    );
  });
});
