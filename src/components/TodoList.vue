<template>		
    <div class = 'crocodile-card '>
        <div class="news-header">
            <h1>{{title}}</h1>
        </div>
        <div class="news-desc">
            <p>{{processDesc(desc)}}</p>
        </div>
        <div class="news-footer">
            <b>{{rate}} / 5</b> {{author}}, {{processDate(date)}}
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
        // data: {
        //     title: '[TITLE]',
        //     desc: '[DESC]',
        //     author: '[AUTHOR]',
        //     rate: '[RATE]',
        //     date: '[DATE]',
        // },
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
        author: {
			type: String,
			required: true,
			default: '[AUTHOR]'
		},
        rate: {
			type: Number,
			required: true,
			default: 3,
		},
        date: {
			type: Number,
			required: true,
			default: 0,
		},

        // array: {
        //     type: Array,
        //     required: true,
        //     default: function () { return [] }
        // }
    },
    methods: {
        ErrorDismiss(index) {
            this.$emit('error-remove',index)
        },
        processDate(date){
            date = new Date(date);
            var d = '0'+date.getDate();
            var m = '0'+(date.getMonth()+1);
            var y = date.getYear()%100;
            console.log(y)
            return d.substr(-2) + '/' + m.substr(-2) + '/' + y
        },
        processDesc(desc){
            desc = desc + ''
            if (desc.length > 200){
                return desc.substring(0,200)+'...'
            }else{
                return desc
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
