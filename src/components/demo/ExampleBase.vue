<template>
    <div></div>
</template>

<script>
    export default {
        name: "ExampleBase",
        data(){
            return {
                text: '',
                tokens:[
                    {
                        name: 'forename',
                        label: 'First Name',
                        example: 'Joe'
                    },
                    {
                        name: 'surname',
                        label: 'Last Name',
                        example: 'Bloggs'
                    },
                    {
                        name: 'order',
                        label: 'Order Number',
                        example: 'ABC123'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>