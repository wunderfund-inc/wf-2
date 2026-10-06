<template>
  <p v-if="typeof answer === 'string'">{{ answer }}</p>
  <div v-else>
    <template v-for="(block, index) in answer">
      <p v-if="block.p" :key="index">{{ block.p }}</p>
      <ul v-else-if="block.ul" :key="index">
        <li v-for="(item, i) in block.ul" :key="i">{{ item }}</li>
      </ul>
      <div v-else-if="block.table" :key="index" class="table-responsive">
        <table class="table table-sm table-bordered text-left">
          <thead>
            <tr>
              <th v-for="(h, i) in block.table.head" :key="i">{{ h }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, r) in block.table.rows" :key="r">
              <td v-for="(cell, c) in row" :key="c">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    answer: { type: [String, Array], required: true },
  },
};
</script>
