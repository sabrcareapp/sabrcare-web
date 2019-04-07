<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="isFullscreen ? true:false"
    transition="dialog-bottom-transition"
  >
    <!-- <v-btn slot="activator" color="secondary" dark>Open Dialog</v-btn> -->
    <v-card>
      <v-toolbar dark :color="color">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          <slot name="toolbarTitle"></slot>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <slot name="toolbarItems">
            <!-- <v-btn dark flat @click="dialog = false">Save</v-btn> -->
          </slot>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <slot name="simpleContent"></slot>
      </v-card-text>
      <template>
        <!-- <slot name="listContent"></slot> -->
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-scroll-y-transition :key="item.index">
              <v-list-tile avatar ripple>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-list-tile-action-text>{{item.action ? actionText[0]:actionText[1]}}</v-list-tile-action-text>
                  <div>
                    <v-btn @click.stop="toggle(index,item.id)" icon ripple>
                      <v-icon v-if="!items[index].action" color="red lighten-1">mdi-minus</v-icon>
                      <v-icon v-else color="green darken-2">mdi-check</v-icon>
                    </v-btn>
                    <v-btn icon ripple @click="deleteItem(index,item.id)">
                      <v-icon color="grey lighten-1">mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-list-tile-action>
              </v-list-tile>
            </v-scroll-y-transition>
            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
        </v-list>
      </template>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    dialogOn: {
      type: Boolean,
      default: false
    },
    isFullscreen: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "green"
    },
    dataInput: {
      type: Object,
      default: function() {
        return { items: [], actionText: [] };
      }
    }
  },
  data() {
    return {
      dialog: false,
      items: this.dataInput.items,
      actionText: this.dataInput.actionText
    };
  },
  methods: {
    toggle(index, id) {
      this.$emit("modal-action-toggled", {
        action: this.items[index].action,
        id
      });
    },
    deleteItem(index, id) {
      this.$emit("modal-item-deleted", {
        action: this.items[index].action,
        id
      });
      this.items.splice(index, 1);
    }
  },
  watch: {
    dialogOn(newVal, oldVal) {
      this.dialog = !this.dialog;
    },
    items(newVal) {
      if (!newVal.length) {
        this.dialog = false;
      }
    }
  }
};
</script>