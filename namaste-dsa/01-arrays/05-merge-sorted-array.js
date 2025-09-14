/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  // We need to iterate in reverse order, so that we don't need to shift values of nums1 then
  // and there is no risk of loosing any nums1 value
  let i = m - 1;
  let j = n - 1;

  for (let k = m + n - 1; k >= 0; --k) {
    // if nums2 exhausts, as nums1 is already sorted, so no need to do anything
    if (j < 0) break;

    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k] = nums1[i--];
    } else {
      // if nums1 exhausts, we need to copy nums2 left values also
      nums1[k] = nums2[j--];
    }
  }
};
