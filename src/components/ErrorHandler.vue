<template>
    <div class="hello">
        <div class = 'error-body'>
            <div v-for = "(err, index) in array" :key = 'index * Date.now()' class = 'error-wrap' @click = 'ErrorDismiss(index)' :style = '{backgroundColor: err[2]}'>
                <p class = 'title'>{{err[0]}}</p>
                <p>{{err[1]}}</p>
            </div>
        </div>

        <div style = 'display: none' v-if='title != "[TITLE]"' >
            {{title}}
        </div>
    </div>
</template>

<script>
export default {
    name: "ErrorHandler",
    data () {
        return {
            // items: ['a', 'b', 'c']
        }
    },
    props: {
        title: {
			type: String,
			required: true,
			default: '[TITLE]'
		},
		desc: {
			type: String,
			required: true,
			default: '[DESCRIPTION]'
		},
        type: {
			type: String,
			required: true,
			default: '[TYPE]'
		},
        array: {
            type: Array,
            required: true,
            default: function () { return [] }
        }
    },
    methods: {
        ErrorDismiss(index) {
            this.$emit('error-remove',index)
        }
    }
    // beforeUpdate () {
    //
    // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
