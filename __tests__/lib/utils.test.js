import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  test('should merge class names correctly', () => {
    // Test with simple strings
    expect(cn('class1', 'class2')).toBe('class1 class2');
    
    // Test with conditional classes
    expect(cn('class1', true && 'class2', false && 'class3')).toBe('class1 class2');
    
    // Test with undefined or null values
    expect(cn('class1', undefined, null, 'class2')).toBe('class1 class2');
    
    // Test with array of classes
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
    
    // Test with object notation
    expect(cn({ 'class1': true, 'class2': false, 'class3': true })).toBe('class1 class3');
    
    // Test with tailwind classes that should be merged
    expect(cn('p-4 m-2', 'p-2')).toBe('m-2 p-2');
  });
});
