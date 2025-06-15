# CommandLine Utils Kickstarts

- [jq](#jsonquery)
- [awk](#awk)

## jsonquery

This is a lightweight and flexible commandline JSON processor.
JQ Selector must contain `.` representing current object being processed.

1. **Object Access**

```sh
 curl -s https://dummyjson.com/users/1 | jq '.firstName'
 curl -s https://dummyjson.com/users/1 | jq '.firstName + " " + .lastName'
```

2. **Arrays Access**

selector - `.[inclusive_index:exclusive_index]`

- _from start_ = 0 based +ve indexing
- _from end_ = 1 based -ve indexing

```sh
echo '[1,2,3,4,5]' | jq '.[0]'
echo '[1,2,3,4,5]' | jq '.[0:3]'
echo '[1,2,3,4,5]' | jq '.[:3]'
echo '[1,2,3,4,5]' | jq '.[:-1]'
echo '[1,2,3,4,5]' | jq '.[2:-1]'
echo '[1,2,3,4,5]' | jq '.[]' # .map() like behavior
```

3. **Array & Object constructor**

```sh
jq '[<selector>]' # Array constructor
jq '{prop1: <selector1>, prop2: <selector2>}' # Array constructor
```

4. **Sorting & Counting**

```sh
jq 'sort'
jq 'sort_by(<prop_selector>)'
# Applicable for arrays as well as strings
jq 'reverse'
jq 'keys'
jq 'length'
```

5. **Maps and Selectes**

`'[.users[] | .id]'` == `'.users | map(.id)'`

`select(predicate)`

> We can apply `|` pipe in JQ selector as well.
>
> ```sh
> curl -s https://dummyjson.com/users | jq '.users | map(select(.id > 20) | .id)'
> curl -s https://dummyjson.com/users | jq '(.users | reverse)[] | {id, name: (.firstName + " " + .lastName), age, email, gender, country: .address.country}'
> curl -s https://dummyjson.com/users | jq '.users | sort_by(.firstName)[] | {id, name: (.firstName + " " + .lastName)}'
> curl -s https://dummyjson.com/users | jq '.users  | map(select(.gender == "male") | {id, name: (.firstName + " " + .lastName), age, email, gender, country: .address.country}) | .[0:2]'
> ```

## awk

Next utility to learn.... :)
