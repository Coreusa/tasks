<template>
  <div class="row no-gutters board">
    <div class="col-12">
      <b-input-group size="sm">
        <template v-slot:append>
          <b-input-group-text>
            <strong
              :class="searchCount > 0 ? 'text-info' : 'text-danger'">
              {{ searchCount !== null ? `Found ${searchCount} results` : '' }}
            </strong>
          </b-input-group-text>
        </template>
        <b-form-input
          v-model="searchTerm"
          placeholder="Find..."
        >
        </b-form-input>
      </b-input-group>
      <b-btn @click="addColumn()">New column</b-btn>
    </div>
    <draggable
      v-model="columns"
      v-bind="dragOptions"
      @end="saveBoard($event)"
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
          @click="chooseNode(column, true)"
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
                @click.stop="chooseNode(column, false)"
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
            class="my-2"
            size="sm"
            block
          >
            New card
            <font-awesome-icon
              icon="plus"
              class="ml-2"
              size="sm"
            >
            </font-awesome-icon>
          </b-btn>
        </div>

        <draggable
          v-model="columns[ci].cards"
          v-bind="dragOptions"
          @end="saveBoard($event)"

          group="cards"
          class="dropzone"
        >
          <div
            v-for="(card, index) in columns[ci].cards"
            :key="`card-${index}`"
            class="d-flex"
          >
            <b-card
              @click="chooseNode(card, true)"
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
                @click.stop="chooseNode(card, false)"
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
      searchTerm: '',
      searchCount: null,
      editMode: false,
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
      // this.$store.dispatch('saveBoard', this.columns)
    },
    searchTerm () {
      if (this.searchTerm.length > 2) {
        let searchCount = 0
        let term = this.searchTerm.toLowerCase()
        let matches = this.columns
          .filter(e => {
            if (e.cards) {
              return e.cards.some(c => c.header.toLowerCase().includes(term))
            }
          })
          .map(e => {
            const el = Object.assign({}, e)
            // Filter the columns card list to only include the cards that match
            if (el.cards) {
              el.cards = el.cards.filter(s => s.header.toLowerCase().includes(term))
              searchCount += el.cards.length
            }
            return el
          })
        if (matches.length) {
          this.searchCount = searchCount
          this.columns = matches
        } else {
          this.searchCount = 0
        }
      } else {
        this.searchCount = null
        this.columns = this.$store.getters.board
      }
    }
  },
  mounted () {
    this.columns = this.$store.getters.board
    // this.originalColumns = this.$store.getters.board
  },
  computed: {
    dragOptions () {
      return {
        animation: 100,
        // Disable sorting when edit is
        disabled: this.editMode
      }
    }
    // editInitiated () {
    //   const res = this.columns.some(e => e.edit === true)
    //   console.log('EDIT INIT: ' + res)
    //   return res
    // }
  },
  methods: {
    addColumn () {
      this.columns.push({
        name: (Math.random() + 1).toString(36).substring(2, 5),
        edit: false,
        cards: []
      })
    },
    chooseNode (column, bool) {
      column.edit = bool
      this.editMode = bool
      // Set to false when a save happens (edit mode off)
      if (bool === false) {
        this.$store.dispatch('saveBoard', this.columns)
      }
    },
    saveBoard (e) {
      console.log('Save board')
      this.$store.dispatch('saveBoard', this.columns)
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
