import {mapState, mapMutations} from 'vuex'
import messageBus from "@src/components/messageBus";


let mixin={
    computed:{
        ...mapState([
            'currentPanel'
        ])
    },
    methods:{
        ...mapMutations([
            'CURRENT_PANEL'
        ]),
    },
    beforeRouteLeave(to,from,next){
        // console.log(this.currentPanel.length,'this.currentPanel.length');
        if(this.currentPanel.length>0){
            if(this.currentPanel[this.currentPanel.length-1].popupName == "middlePage"){
                
                messageBus.$emit("tipCoverShow", {
                    status: 0
                });
            }
            this.CURRENT_PANEL('');
            next(false);
        }else{
            next();
        }
    }
}
export default mixin;