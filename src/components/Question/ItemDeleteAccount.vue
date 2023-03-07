<template>
    <div class="delete-page">
        <div class="delete-page__section">
            <div class="delete-page__title">
                <h2>Are you sure?</h2>
                <small>Do you really want to delete your Profile? This process cannot be undone.</small>
            </div>
            <div class="delete-page__buttons">
                <button class="delete-page__button-delete" @click="deleteUser">Yes</button>
                <button class="delete-page__button-cancel" @click="$emit('close')">No</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
    emits: ['close'],
    setup() {
        const store = useStore()
        const deleteUser =  async () => {
            await store.dispatch('deleteUser/remove')
        }
        return {
            deleteUser
        }
    }
}
</script>

<style lang="scss" scoped>
.delete-page {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 100px;
    @media (max-width: 560px) {
        margin-top: 20px;
    }
    // .delete-page__section
    &__image-svg {
        margin-bottom: 20px;
        svg {
            width: 80px;
            height: 80px;
            @media (max-width: 420px) {
                display: none;
            }
        }
    }

    &__section {
        display: flex;
        text-align: center;
        flex-direction: column;
        background: url('@/assets/img/bg.webp');
        border: 1px solid #4f678b;
        border-radius: 10px;
        max-width: 300px;
        height: 100%;
        padding: 10px;
    }   

    // .delete-page__title

    &__title {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $white;
        gap: 10px;
        margin-bottom: 10px;
        h2{
            color: #fff;
        }
        small {
            opacity: 0.8;
        }
    }

    // .delete-page__button


    &__buttons {
        display: flex;
        justify-content: center;
        gap: 10px;
        width: 100%;
        @media (max-width: 425px) {
            display: flex;
            flex-wrap: wrap;
        }
        button {
            max-width: 130px;
            padding: 10px 30px;
            border-radius: 10px;
            margin-bottom: 5px;
            background: rgb(11, 30, 51);
            color: $white;
            border: 1px solid transparent;
            &:hover {
                border: 1px solid #fff;
                background: rgb(29,39,59, 0.8);
                box-shadow: 0 0 .2rem #fff,
                0 0 .2rem rgb(29, 66, 109),
                0 0 2rem rgb(29, 66, 109),
                0 0 0.8rem rgb(29, 66, 109),
                0 0 2.8rem rgb(29, 66, 109),
                inset 0 0 1.3rem rgb(29, 66, 109); 
            }
        }
    }

}
</style>