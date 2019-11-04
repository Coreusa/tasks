<template>
  <div class="row no-gutters board">
    <div class="col-12">
      <p><b-btn @click="addColumn()">Add column</b-btn></p>
    </div>
    <draggable
      v-model="columns"
      v-bind="dragOptions"
      class="d-flex"
      ghost-class="ghost"
    >
      <b-card
        no-body
        v-for="(column, ci) in columns"
        :key="`column-${ci}`"
        class="column col mr-2 p-0"
      >
        <b-card-header
          @click="column.edit = true"
          class="d-flex p-1 py-2 align-items-center pl-3"
        >
          <b-input-group
            v-if="column.edit"
            size="sm"
          >
            <b-form-input v-model="column.name"/>
            <b-input-group-append>
              <b-button
                variant="success"
                @click.stop="column.edit = false"
              >
                Ok
              </b-button>
            </b-input-group-append>
          </b-input-group>
          <div
            v-else
          >
            {{ column.name }}
          </div>
          <b-btn
            @click.stop="removeColumn(ci)"
            variant="default"
            class="ml-auto"
            size="sm"
          >
            <font-awesome-icon
              icon="times"
              >
            </font-awesome-icon>
          </b-btn>
        </b-card-header>
        <div class="d-flex w-100">
          <b-btn
            @click="addCard(ci)"
            variant="info"
            size="sm"
          >
            <font-awesome-icon
              icon="plus"
            >
            </font-awesome-icon>
          </b-btn>
        </div>

        <draggable
          v-model="columns[ci].cards"
          v-bind="dragOptions"
          group="cards"
          class="dropzone"
        >
          <div
            v-for="(card, index) in columns[ci].cards"
            :key="`card-${index}`"
            class="d-flex"
          >
            <b-card
              @click="card.edit = true"
              class="task w-100 mb-1 mx-1"
              no-body
            >
              <div class="d-flex w-100">
                <h5 class="ml-2 mt-2 mb-0">
                  {{ card.header }}
                </h5>
                <b-btn
                  @click="removeCard(ci, index)"
                  variant="default"
                  class="ml-auto"
                  size="sm"
                >
                  <font-awesome-icon
                    icon="times"
                  >
                  </font-awesome-icon>
                </b-btn>
              </div>
              <div v-if="!card.edit" class="p-2">
                <p>{{ card.description}}</p>
              </div>
              <div v-else>
                <b-form-input
                  v-model="card.header"
                  class="mb-2"
                />
                <b-form-textarea
                  v-model="card.description"
                >
                </b-form-textarea>
              </div>
              <b-btn
                v-if="card.edit"
                variant="default"
                size="sm"
                @click.stop="card.edit = false"
              >
                <font-awesome-icon
                  :icon="card.edit ? 'check' : 'pencil-alt'"
                >
                </font-awesome-icon>
              </b-btn>
            </b-card>
          </div>
        </draggable>
      </b-card>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  name: 'Cards',
  components: {
    draggable
  },
  data () {
    return {
      columns: [
        {
          name: 'Column',
          edit: false,
          cards: []
        }
      ]
    }
  },
  watch: {
    columns () {
      console.log('Change')
      this.$store.dispatch('saveBoard', this.columns)
    }
  },
  mounted () {
    this.columns = this.$store.getters.board
  },
  computed: {
    dragOptions () {
      return {
        animation: 100,
        disabled: false
      }
    }
  },
  methods: {
    addColumn () {
      this.columns.push({
        name: (Math.random() + 1).toString(36).substring(2, 5),
        edit: false,
        cards: []
      })
    },
    removeColumn (index) {
      this.columns.splice(index, 1)
    },
    addCard (columnIndex) {
      this.columns[columnIndex].cards.push({
        header: 'Card header',
        description: 'Card description',
        priority: 1,
        edit: false
      })
      this.$store.dispatch('saveBoard', this.columns)
    },
    removeCard (columnIndex, cardIndex) {
      this.columns[columnIndex].cards.splice(cardIndex, 1)
      this.$store.dispatch('saveBoard', this.columns)
    }
  }
}
</script>
<style>
  .board .column {
    height: 90vh;
    min-width: 250px;
    background: #f2f2f2;
  }
  .board .column {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .sortable-ghost {
    background-color: #33769a;
    /* border: 1px dashed #222; */
    opacity: 0.9;
    /* padding: 10px; */
  }
  .dropzone {
    /* Make it easier to drop card onto empty columns */
    min-height: 60vh;
    /* background-color: green; */
  }
  .card {
    cursor: pointer;
  }
  .task {
    transition: all .5s ease-out;
  }
  .task:hover {
    background-color: rgba(66, 0, 138, .3);
  }
</style>
