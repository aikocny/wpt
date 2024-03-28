// META: title=validation tests for WebNN API pooling operation
// META: global=window,dedicatedworker
// META: script=../resources/utils_validation.js

'use strict';

const kPoolingOperators = ['averagePool2d', 'l2Pool2d', 'maxPool2d'];

kPoolingOperators.forEach((operatorName) => {
  validateInputFromAnotherBuilder(
      operatorName, {dataType: 'float32', dimensions: [2, 2, 2, 2]});
});


const tests = [
  {
    name: 'Test pool2d with default options.',
    input: {dataType: 'float32', dimensions: [1, 3, 4, 4]},
    output: {dataType: 'float32', dimensions: [1, 3, 1, 1]}
  },
  {
    name: 'Test pool2d with windowDimensions',
    input: {dataType: 'float32', dimensions: [1, 3, 4, 4]},
    options: {
      windowDimensions: [3, 3],
    },
    output: {dataType: 'float32', dimensions: [1, 3, 2, 2]}
  },
  {
    name: 'Test pool2d with padding.',
    input: {dataType: 'float32', dimensions: [1, 3, 5, 5]},
    options: {
      windowDimensions: [5, 5],
      padding: [2, 2, 2, 2],
    },
    output: {dataType: 'float32', dimensions: [1, 3, 5, 5]}
  },
  {
    name: 'Test pool2d with strides.',
    input: {dataType: 'float32', dimensions: [1, 3, 5, 5]},
    options: {
      windowDimensions: [2, 2],
      strides: [2, 2],
    },
    output: {dataType: 'float32', dimensions: [1, 3, 2, 2]}
  },
  {
    name: 'Test pool2d with strides and padding.',
    input: {dataType: 'float32', dimensions: [1, 3, 5, 5]},
    options: {
      windowDimensions: [3, 3],
      padding: [1, 1, 1, 1],
      strides: [2, 2],
    },
    output: {dataType: 'float32', dimensions: [1, 3, 3, 3]}
  },
  {
    name: 'Test pool2d with strides and asymmetric padding.',
    input: {dataType: 'float32', dimensions: [1, 3, 7, 7]},
    options: {
      windowDimensions: [4, 4],
      padding: [2, 1, 2, 1],
      strides: [2, 2],
    },
    output: {dataType: 'float32', dimensions: [1, 3, 4, 4]}
  },
  {
    name: 'Test pool2d with strides, padding and roundingType="floor".',
    input: {dataType: 'float32', dimensions: [1, 3, 7, 7]},
    options: {
      windowDimensions: [4, 4],
      padding: [1, 1, 1, 1],
      strides: [2, 2],
      roundingType: 'floor',
    },
    output: {dataType: 'float32', dimensions: [1, 3, 3, 3]}
  },
  {
    name: 'Test pool2d with strides, padding and roundingType="ceil".',
    input: {dataType: 'float32', dimensions: [1, 3, 7, 7]},
    options: {
      windowDimensions: [4, 4],
      padding: [1, 1, 1, 1],
      strides: [2, 2],
      roundingType: 'ceil',
    },
    output: {dataType: 'float32', dimensions: [1, 3, 4, 4]}
  },
  {
    name: 'Test pool2d with explicit outputSizes ignored roundingType',
    input: {dataType: 'float32', dimensions: [1, 3, 7, 7]},
    options: {
      windowDimensions: [4, 4],
      padding: [1, 1, 1, 1],
      strides: [2, 2],
      roundingType: 'ceil',
      outputSizes: [3, 3],
    },
    output: {dataType: 'float32', dimensions: [1, 3, 3, 3]}
  },
  {
    name: 'Test pool2d with strides, padding and outputSizes=[3, 3].',
    input: {dataType: 'float32', dimensions: [1, 3, 7, 7]},
    options: {
      windowDimensions: [4, 4],
      padding: [1, 1, 1, 1],
      strides: [2, 2],
      outputSizes: [3, 3],
    },
    output: {dataType: 'float32', dimensions: [1, 3, 3, 3]}
  },
  {
    name: 'Test pool2d with strides, padding and outputSizes=[4, 4].',
    input: {dataType: 'float32', dimensions: [1, 3, 7, 7]},
    options: {
      windowDimensions: [4, 4],
      padding: [1, 1, 1, 1],
      strides: [2, 2],
      outputSizes: [4, 4],
    },
    output: {dataType: 'float32', dimensions: [1, 3, 4, 4]}
  },
  {
    name: 'Test pool2d with layout="nchw".',
    input: {dataType: 'float32', dimensions: [1, 2, 5, 5]},
    options: {
      windowDimensions: [3, 3],
      layout: 'nchw',
    },
    output: {dataType: 'float32', dimensions: [1, 2, 3, 3]}
  },
  {
    name: 'Test pool2d with layout="nhwc".',
    input: {dataType: 'float32', dimensions: [1, 5, 5, 2]},
    options: {
      windowDimensions: [3, 3],
      layout: 'nhwc',
    },
    output: {dataType: 'float32', dimensions: [1, 3, 3, 2]}
  },
  {
    name: 'Throw if the input is not a 4-D tensor.',
    input: {dataType: 'float32', dimensions: [1, 5, 5]},
  },
  {
    name: 'Throw if the output sizes is incorrect.',
    input: {dataType: 'float32', dimensions: [1, 2, 5, 5]},
    options: {
      windowDimensions: [2, 2],
      padding: [2, 2, 2, 2],
      strides: [2, 2],
      outputSizes: [3, 3],
    },
  },
  {
    name: 'Throw if the length of output sizes is not 2.',
    input: {dataType: 'float32', dimensions: [1, 2, 5, 5]},
    options: {
      windowDimensions: [2, 2],
      padding: [2, 2, 2, 2],
      strides: [2, 2],
      outputSizes: [1, 2, 4, 4],
    },
  },
  {
    name: 'Throw if the length of window dimensions is not 2.',
    input: {dataType: 'float32', dimensions: [1, 2, 5, 5]},
    options: {
      windowDimensions: [1, 1, 1, 1],
    },
  },
  {
    name: 'Throw if any window dimension is lesser than 1.',
    input: {dataType: 'float32', dimensions: [1, 2, 5, 5]},
    options: {
      windowDimensions: [0, 2],
    },
  },
  {
    name:
        'Throw if the input height is too small to fill the pool window height.',
    input: {dataType: 'float32', dimensions: [1, 2, 5, 5]},
    options: {
      windowDimensions: [8, 2],
    },
  },
  {
    name:
        'Throw if the input width is too small to fill the pool window width.',
    input: {dataType: 'float32', dimensions: [1, 2, 5, 5]},
    options: {
      windowDimensions: [2, 8],
    },
  },
  {
    name: 'Throw if the calculated output height is equal to 0.',
    input: {dataType: 'float32', dimensions: [1, 2, 5, 5]},
    options: {
      windowDimensions: [6, 3],
    },
  },
  {
    name: 'Throw if the calculated output width is equal to 0.',
    input: {dataType: 'float32', dimensions: [1, 2, 5, 5]},
    options: {
      windowDimensions: [3, 6],
    },
  },
  {
    name: 'Throw if the length of padding is not 4.',
    input: {dataType: 'float32', dimensions: [1, 2, 5, 5]},
    options: {
      padding: [2, 2],
    },
  },
  {
    name: 'Throw if the length of strides is not 2.',
    input: {dataType: 'float32', dimensions: [1, 2, 5, 5]},
    options: {
      strides: [2],
    },
  },
  {
    name: 'Throw if one stride value is smaller than 1.',
    input: {dataType: 'float32', dimensions: [1, 2, 5, 5]},
    options: {
      strides: [0, 2],
    },
  },
  {
    name: 'Throw if the length of dilations is not 2.',
    input: {dataType: 'float32', dimensions: [1, 2, 5, 5]},
    options: {
      dilations: [1, 1, 2],
    },
  },
  {
    name: 'Throw if one dilation value is smaller than 1.',
    input: {dataType: 'float32', dimensions: [1, 2, 5, 5]},
    options: {
      dilations: [1, 0],
    },
  },
  {
    name: 'Throw if the output operand\'s byte length is too large.',
    input: {dataType: 'float32', dimensions: [1, 3, 5, 5]},
    options: {
      padding: [kMaxUnsignedLong, kMaxUnsignedLong, kMaxUnsignedLong, kMaxUnsignedLong],
    },
  },
];

tests.forEach(
    test => promise_test(async t => {
      const input = builder.input(
          'input',
          {dataType: test.input.dataType, dimensions: test.input.dimensions});

      kPoolingOperators.forEach((operatorName) => {
        if (test.output) {
          const output = builder[operatorName](input, test.options);
          assert_equals(output.dataType(), test.output.dataType);
          assert_array_equals(output.shape(), test.output.dimensions);
        } else {
          assert_throws_js(
              TypeError, () => builder[operatorName](input, test.options));
        }
      });
    }, test.name));
