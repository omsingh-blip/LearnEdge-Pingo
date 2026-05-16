export const dsaQuestions = [

{
id:1,

title:"Two Sum",

difficulty:"Easy",

topic:"Arrays",

xp:10,

description:
"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",

example:`
Input:
nums = [2,7,11,15]
target = 9

Output:
[0,1]

Explanation:
nums[0] + nums[1] = 9
`
},

{
id:2,

title:"Best Time to Buy and Sell Stock",

difficulty:"Easy",

topic:"Arrays",

xp:10,

description:
"You are given an array prices where prices[i] is the stock price on day i. Find the maximum profit by buying once and selling once.",

example:`
Input:
prices = [7,1,5,3,6,4]

Output:
5

Explanation:
Buy at 1 and sell at 6
`
},

{
id:3,

title:"Contains Duplicate",

difficulty:"Easy",

topic:"HashMap",

xp:10,

description:
"Given an integer array nums, return true if any value appears at least twice.",

example:`
Input:
nums=[1,2,3,1]

Output:
true
`
},

{
id:4,

title:"Valid Parentheses",

difficulty:"Easy",

topic:"Stack",

xp:15,

description:
"Given a string containing only (), {}, [] determine if the brackets are valid.",

example:`
Input:
s="()[]{}"

Output:
true
`
},

{
id:5,

title:"Binary Search",

difficulty:"Easy",

topic:"Searching",

xp:15,

description:
"Given a sorted array and a target value, return its index using binary search.",

example:`
Input:
nums=[-1,0,3,5,9,12]
target=9

Output:
4
`
},

{
id:6,

title:"Merge Intervals",

difficulty:"Medium",

topic:"Arrays",

xp:20,

description:
"Given intervals where intervals[i]=[start,end], merge all overlapping intervals.",

example:`
Input:
[[1,3],[2,6],[8,10],[15,18]]

Output:
[[1,6],[8,10],[15,18]]
`
},

{
id:7,

title:"Product of Array Except Self",

difficulty:"Medium",

topic:"Prefix Sum",

xp:20,

description:
"Return an array answer such that answer[i] equals product of all elements except nums[i].",

example:`
Input:
nums=[1,2,3,4]

Output:
[24,12,8,6]
`
},

{
id:8,

title:"Group Anagrams",

difficulty:"Medium",

topic:"HashMap",

xp:25,

description:
"Group the strings that are anagrams together.",

example:`
Input:
["eat","tea","tan","ate","nat","bat"]

Output:
[
["eat","tea","ate"],
["tan","nat"],
["bat"]
]
`
},

{
id:9,

title:"Longest Consecutive Sequence",

difficulty:"Hard",

topic:"HashSet",

xp:30,

description:
"Find the length of the longest consecutive elements sequence.",

example:`
Input:
nums=[100,4,200,1,3,2]

Output:
4

Explanation:
Sequence: [1,2,3,4]
`
},

{
id:10,

title:"LRU Cache",

difficulty:"Hard",

topic:"Linked List",

xp:35,

description:
"Design and implement an LRU cache with O(1) get and put operations.",

example:`
Input:
LRUCache cache=new LRUCache(2)

cache.put(1,1)
cache.put(2,2)
cache.get(1)

Output:
1
`
}

];