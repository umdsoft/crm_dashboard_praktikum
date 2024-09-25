<script>
export default {
  // Accepting chartData as a prop
  props: {
    chartData: {
      type: Array,  // We expect an array of objects
      required: true
    }
  },
  data() {
    return {
      options: {
        animationEnabled: true,
        data: [{
          type: "column",
          dataPoints: []  // Initially empty, will be populated with prop data
        }]
      }
    }
  },
  watch: {
    // Watching the chartData prop for changes
    chartData: {
      handler(newData) {
        console.log('Received chart data:', newData); // Log the data
        // Replace the dataPoints array to make sure Vue detects the changes
        this.options = {
          ...this.options,
          data: [{
            type: "column",
            dataPoints: newData  // Update the chart dataPoints with the new data
          }]
        };
      },
      immediate: true  // This ensures the handler runs immediately upon mount
    }
  }
}
</script>

<template>
  <div>
    <!-- Binding the options object to CanvasJSChart -->
    <CanvasJSChart :options="options" />
  </div>
</template>
