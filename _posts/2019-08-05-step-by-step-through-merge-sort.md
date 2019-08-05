Hello friend. Having trouble puzzling out **merge sort**? Me too, but together we can do it!

First of all, here's the algorithm written in Ruby from [rosettacode.org](https://rosettacode.org/wiki/Sorting_algorithms/Merge_sort#Ruby):

    def merge_sort(m)
      return m if m.length <= 1

      middle = m.length / 2
      left = merge_sort(m[0...middle])
      right = merge_sort(m[middle..-1])
      merge(left, right)
    end

    def merge(left, right)
      result = []
      until left.empty? || right.empty?
        result << (left.first <= right.first ? left.shift : right.shift)
      end
      result + left + right
    end

That's nice. We'll be much more confident looking at it by the end of this post, trust me.

Let's start simple. Merge sort is about sorting elements so here's the simplest list we can have:

    list = []

Okay, let's sort this!

    merge_sort [] # => []

Makes sense. According to the first line in `merge_sort` I'm also expecting that an array of size one will be returned as it is.

    merge_sort [rand(2)] # => [1]

Okay, arrays with one or zero elements are already sorted, that's clear. And they're also the **base case** of our recursive calls to `merge_sort`. Lists greater than them will be divided until they'll be that small, and then feed into another method, `merge`, that will handle the actual sorting. We're going to deal with it.

What if we give ourself a slightly more exciting input? Let's sort a random list of 2 elements:

    list = (0..9).to_a.sample(2) # => [5, 3]
    merge_sort(list)             # => [3, 5]

Let's figure out what happend now that we passed through that first **guard clause**.

`middle` is assigned to half the size of the array so that we can conveniently split it in half. We recursively call `merge_sort` again, feeding it each half of the original list and assigning the returning value to the variables `left` and `right`. With those two juicy arrays we feed another method: `merge`, which gives us the sorted list we are craving for.

    list                      # => [5, 3]
    middle = list.size / 2    # => 1

    lhalf = list[0...middle]  # => [5]
    rhalf = list[middle..-1]  # => [3]

    left = merge_sort(lhalf)  # => [5]
    right = merge_sort(rhalf) # => [3]

    merge(left, right)        # => [3, 5]

Interesting. So now, what's `merge` doing? Let's see, it first assigns an empty array to `result`, pushing inside the return value of a ternary operator, until one of the given argument becomes empty.

So, if the first element of `left` (5) is less-than-or-equal-to the first element of `right` (3), we call `#shift` on it and push the first element of that array in `result`. Of course 5 is not less-than-or-equal-to 3 so we shift on `right`, which now becomes empty (remember that `#shift` removes the first element of the array it's called upon) and thus breaking from the loop:

    result << (left.first <= right.first ? left.shift : right.shift)
    result                # => [3]

    left                  # => [5]
    right                 # => []

    result + left + right # => [3, 5]
    # [3]  + [5]  + []

We have all the basic elements now to understand more lengthy calls to `merge_sort`. Let's break down with some **pseudopseudocode** what would happen with a list of 3 elements:

    Sort [5, 4, 3]
      Split [5, 4, 3] into [5] and [4, 3]

      We know how 1 element lists get sorted:
      Sort [5] returns [5]

      We also know how a list of 2 elements gets sorted:
      Sort [4, 3]
        Split [4, 3] into [4] and [3]

        Sort [4] returns [4]
        Sort [3] returns [3]

        Merge [4] and [3]
          4 comes after 3 so shift 3 and have [3]
          Nothing left to compare 4 with so let's add what remains and have [3, 4]

        We still have [5] hanging around so:
        Merge [5] and [3, 4]
          5 comes after 3 so shift 3 and have [3]
          5 comes after 4 so shif 4 and have [3, 4]
          Nothing left to compare 5 with so let's add what remains and have [3, 4, 5]

Or, more schematically:

    [5, 3, 4] -> merge_sort

    ..[5] <-

    ..[3, 4] -> merge_sort
    .....[3] <-
    .....[4] <-

    .....[3], [4] -> merge
    ..[3, 4] <-

    ..[5], [3, 4] -> merge
    [3, 4, 5] <- 🎉

One last example of what happens with a 4 elements list:

    [5, 3, 0, 4] -> merge_sort

    ..[5, 3] -> merge_sort
    .....[5] <-
    .....[3] <-

    .....[5], [3] -> merge
    ..[3, 5] <-

    ..[0, 4] -> merge_sort
    .....[0] <-
    .....[4] <-

    .....[0], [4] -> merge
    ..[0, 4] <-

    ..[3, 5], [0, 4] -> merge
    [0, 3, 4, 5] <- 🎉

Hope at least something's more clear by now. If not, my mistake!
