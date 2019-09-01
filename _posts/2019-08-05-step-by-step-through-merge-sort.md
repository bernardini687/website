---
category: technical
---
hello friend. having trouble puzzling out merge sort? let's have a close look at it.<br>here's the algorithm written in ruby from rosettacode.org:
```
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
```
that's nice. we'll be much more confident looking at it by the end of this post, trust me. let's start simple. merge sort is about sorting elements so here's the simplest list we can have:

    list = []

okay, let's sort this!

    merge_sort [] # => []

makes sense. according to the first line in `merge_sort` i'm also expecting that an array of size one will be returned as it is:

    merge_sort [rand(2)] # => [1]

okay, arrays with one or zero elements are already sorted, that's clear. and they're also the base case of our recursive calls to `merge_sort`. lists greater than them will be divided until they'll be that small, and then fed into another method, `merge`, that will handle the actual sorting. we're going to deal with it.

what if we give ourself a slightly more exciting input? let's sort a random list of 2 elements:

    list = (0..9).to_a.sample(2) # => [5, 3]
    merge_sort(list)             # => [3, 5]

let's figure out what happend now that we passed through that first guard clause.

`middle` is assigned to half the size of the array so that we can conveniently split it in half. we recursively call `merge_sort` again, feeding it each half of the original list and assigning the returning value to the variables `left` and `right`. with those two juicy arrays we feed another method: `merge`, which gives us the sorted list we are craving for.
```
list                      # => [5, 3]
middle = list.size / 2    # => 1

lhalf = list[0...middle]  # => [5]
rhalf = list[middle..-1]  # => [3]

left = merge_sort(lhalf)  # => [5]
right = merge_sort(rhalf) # => [3]

merge(left, right)        # => [3, 5]
```
interesting. so now, what's `merge` doing? let's see, it first assigns an empty array to `result`, pushing inside it the return value of a ternary operator, until one of the given argument becomes empty.

so, if the first element of `left` (5) is less-than-or-equal-to the first element of `right` (3), we call `#shift` on it and push the first element of that array in `result`. of course 5 is not less-than-or-equal-to 3 so we shift on `right`, which now becomes empty (remember that `#shift` removes the first element of the array it's called upon), thus breaking from the loop:
```
result << (left.first <= right.first ? left.shift : right.shift)
result                # => [3]

left                  # => [5]
right                 # => []

result + left + right # => [3, 5]
# [3]  + [5]  + []
```
now we have all the basic elements to understand more lengthy calls to `merge_sort`. let's break down with some pseudopseudocode what would happen with a list of 3 elements:
```
sort [5, 4, 3]
  split [5, 4, 3] into [5] and [4, 3]
  we know how 1 element lists get sorted:
  sort [5] returns [5]

  we also know how a list of 2 elements gets sorted:
  sort [4, 3]
    split [4, 3] into [4] and [3]

    sort [4] returns [4]
    sort [3] returns [3]

    merge [4] and [3]
      4 comes after 3 so shift 3 and have [3]
      nothing left to compare 4 with, so let's add what remains and have [3, 4]

    we still have [5] hanging around so:
    merge [5] and [3, 4]
      5 comes after 3 so shift 3 and have [3]
      5 comes after 4 so shift 4 and have [3, 4]
      nothing left to compare 5 with, so let's add what remains and have [3, 4, 5]
```
or, more schematically:
```
[5, 3, 4] -> merge_sort

..[5] <-

..[3, 4] -> merge_sort
.....[3] <-
.....[4] <-

.....[3], [4] -> merge
..[3, 4] <-

..[5], [3, 4] -> merge
[3, 4, 5] <- 🎉
```
one last example of what happens with a 4 elements list:
```
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
```
hope at least something's more clear by now. if not, my mistake!
