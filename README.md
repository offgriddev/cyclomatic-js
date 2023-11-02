# CyclomaticJS - A Complexity Measurement for JavaScript

Cyclomatic Complexity was developed by a Computer Scientist at IBM named Thomas McCabe in an article titled [A Complexity Measurement](https://ieeexplore.ieee.org/document/1702388). A metric we often use to identify "code quality" concerns, cyclomatic complexity is a useful analytical tool for many reasons. And now it's available for Vanilla JavaScript! 

If you're unfamiliar with Cyclomatic Complexity, it's an application of Graph Theory to the logical structure of algorithms. The logical structure of algorithms accounts for many constructs we leverage in software engineering: if-statements, switch-statements, for/while/forof/dowhile loops, etc. In measuring these facets of our source code, Cyclomatic Complexity measures _how many possible linear paths through a given algorithm_. It will produce a simple integer value as an assessment. For example, the following code has an objective Complexity of 2:

```javascript
function main(a) {
  if (a > 0) {
    return "is positive"
  }

  return "is negative"
}
```

As code grows, and I'm sure we've all seen it, algorithms can take on a life of their own and grow to contain numerous linear paths that all have to be maintained and amount to the cognitive overhead of a given algorithm. 

This library provides any JS library the ability to analyze the Cyclomatic Complexity of their functions with a dependency solely on the [abstract-syntax-tree](https://www.npmjs.com/package/abstract-syntax-tree)

# How to Use

CyclomaticJS has one named export: `calculateComplexity`

This function takes a `filename` and calculates the logical complexity of a file's contents.

```javascript
import { calculateComplexity } from 'cyclomatic-js'

const complexity = calculateComplexity('somefile.js')

```

# Supported Source Code

CyclomaticJS supports both CommonJS and ESModules. Please raise an issue if there are problems with either module loading systems.