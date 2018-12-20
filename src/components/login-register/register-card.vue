<template>
  <v-card>
    <v-dialog
      v-model="showFailedDialog"
      max-width="200"
    >
      <v-card>
        <v-card-text class="text-xs-center headline">
          <p>
            <v-icon
              size="48"
              color="primary"
            >warning</v-icon>
          </p>
          <p>註冊失敗</p>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-stepper
      alt-labels
      v-model="currentStep"
    >
      <v-card>
        <v-stepper-header>
          <v-layout
            row
            wrap
          >
            <v-flex>
              <v-stepper-step
                class="pt-3 pb-1"
                :complete="currentStep > 1"
                step="1"
              >用戶名稱</v-stepper-step>
            </v-flex>
            <v-flex>
              <v-stepper-step
                class="pt-3 pb-1"
                :complete="currentStep > 2"
                step="2"
              >用戶密碼</v-stepper-step>
            </v-flex>
            <v-flex>
              <v-stepper-step
                class="pt-3 pb-1"
                step="3"
              >用戶協議</v-stepper-step>
            </v-flex>
          </v-layout>
        </v-stepper-header>
      </v-card>

      <v-stepper-items>
        <v-stepper-content
          class="pa-0"
          step="1"
        >
          <v-card class="px-5 pb-5 pt-0">
            <v-card-text class="pa-0">
              <v-layout
                row
                wrap
              >
                <v-flex
                  xs12
                  class="py-3 headline text-xs-center"
                >填寫用戶名稱</v-flex>
                <v-flex xs12>
                  <v-text-field
                    ref="username"
                    v-model="username"
                    label="用戶名稱"
                    prepend-inner-icon="person"
                    :rules="[checkUsername]"
                    :error-messages="errorMessage"
                    counter="30"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions class="pa-0 pt-3">
              <v-layout
                row
                wrap
              >
                <v-flex xs12>
                  <v-btn
                    color="primary"
                    block
                    :disabled="usernameHasError || !usernameExistedChecked || usernameExisted"
                    @click="nextStep"
                  >下一步</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
        <v-stepper-content
          class="pa-0"
          step="2"
        >
          <v-card class="px-5 pb-5 pt-0">
            <v-card-text class="pa-0">
              <v-layout
                row
                wrap
              >
                <v-flex
                  xs12
                  class="py-3 headline text-xs-center"
                >填寫用戶密碼</v-flex>
                <v-flex xs12>
                  <v-text-field
                    ref="password"
                    v-model="password"
                    label="密碼"
                    prepend-inner-icon="lock"
                    :disabled="isLoading"
                    :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                    :type="showPassword ? 'text' : 'password'"
                    @mousedown="showPassword = true"
                    @mouseup="showPassword = false"
                    :rules="[checkPassword]"
                    counter="25"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions class="pa-0 pt-3">
              <v-layout
                row
                wrap
              >
                <v-flex xs12>
                  <v-btn
                    color="primary"
                    block
                    :disabled="passwordHasError"
                    @click="nextStep"
                  >下一步</v-btn>
                </v-flex>
                <v-flex xs12>
                  <v-btn
                    class="mt-3"
                    flat
                    block
                    @click="previousStep"
                  >上一步</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
        <v-stepper-content
          class="pa-0"
          step="3"
        >
          <v-card class="px-0 pb-5 pt-0">
            <v-card-title class="px-4">
              <span class="headline">用戶協議</span>
            </v-card-title>
            <v-card-text
              style="overflow-y: scroll; height: 300px"
              class="px-4 py-0"
            >{{ licenseContext }}</v-card-text>
            <v-card-actions class="px-5 py-0">
              <v-layout
                row
                wrap
              >
                <v-flex xs12>
                  <v-checkbox
                    v-model="agree"
                    color="primary"
                    label="我同意上述協議之內容"
                  ></v-checkbox>
                </v-flex>
                <v-flex xs12>
                  <v-btn
                    color="primary"
                    block
                    @click="register"
                    :loading="isLoading"
                    :disabled="isLoading || !agree"
                  >
                    註冊
                    <span slot="loader">註冊中</span>
                  </v-btn>
                </v-flex>
                <v-flex xs12>
                  <v-btn
                    class="mt-3"
                    flat
                    block
                    @click="previousStep"
                  >上一步</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      currentStep: 1,
      username: '',
      usernameHasError: false,
      usernameExisted: false,
      usernameExistedChecked: false,
      errorMessage: '',
      password: '',
      passwordHasError: false,
      showPassword: false,
      showFailedDialog: false,
      agree: false,
      isLoading: false,
      isReseting: false,
      rules: {
        required: value => !!value,
        min: value => value.length >= 8,
        max: value => value.length <= 30,
        ascii: value => new RegExp('^[\\\x00-\x7F]*$').test(value)
      }
    }
  },
  computed: {
    licenseContext () {
      return `Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit. Nostra urna at, magna at neque sed sed ante imperdiet, dolor mauris cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo, augue in, duis erat proin condimentum in a eget, sed fermentum sed vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor. Ultrices nascetur nulla gravida ante arcu. Pharetra rhoncus morbi ipsum, nunc tempor debitis, ipsum pellentesque, vitae id quam ut mauris dui tempor, aptent non. Quisque turpis. Phasellus quis lectus luctus orci eget rhoncus. Amet donec vestibulum mattis commodo, nulla aliquet, nibh praesent, elementum nulla. Sit lacus pharetra tempus magna neque pellentesque, nulla vel erat.
                    Justo ex quisque nulla accusamus venenatis, sed quis. Nibh phasellus gravida metus in, fusce aenean ut erat commodo eros. Ut turpis, dui integer, nonummy pede placeat nec in sit leo. Faucibus porttitor illo taciti odio, amet viverra scelerisque quis quis et tortor, curabitur morbi a. Enim tempor at, rutrum elit condimentum, amet rutrum vitae tempor torquent nunc. Praesent vestibulum integer maxime felis. Neque aenean quia vitae nostra, tempus elit enim id dui, at egestas pulvinar. Integer libero vestibulum, quis blandit scelerisque mattis fermentum nulla, tortor donec vestibulum dolor amet eget, elit nullam. Aliquam leo phasellus aliquam curabitur metus a, nulla justo mattis duis interdum vel, mollis vitae et id, vestibulum erat ridiculus sit pulvinar justo sed. Vehicula convallis, et nulla wisi, amet vestibulum risus, quam ac egestas.
                    Et vitae, nulla gravida erat scelerisque nullam nunc pellentesque, a dictumst cras augue, purus imperdiet non. Varius montes cursus varius vel tortor, nec leo a qui, magni cras, velit vel consectetuer lobortis vel. Nibh erat et wisi felis leo porttitor, sapien nibh sapien pede mi, sed eget porttitor, repellendus arcu ac quis. Luctus vulputate aut est sem magna, placerat accumsan nunc vestibulum ipsum ac auctor, maecenas lorem in ut nec mauris tortor, doloribus varius sem tortor vestibulum mollis, eleifend tortor felis tempus lacus eu eu. Eleifend vel eu, nullam maecenas mauris nec nunc euismod, tortor porta ridiculus potenti, massa tristique nam magna, et wisi placerat et erat ante. Eget pede erat in facilisis, fermentum venenatis sodales. Ac tortor sociis et non animi tristique, rhoncus malesuada, ut arcu volutpat scelerisque sollicitudin, elit curabitur dui pede purus dolor, integer aenean risus taciti nulla eleifend accumsan. At pulvinar diam parturient, interdum mi velit aliquet et a. Arcu at ac placerat eget justo semper, purus sociis curabitur mi ipsum consequat ut, mollis vestibulum, est ante ornare lacus sem. Neque magna mauris, commodo quisque, praesent semper suscipit lobortis nam. Justo malesuada cursus ac nunc litora nunc. Tellus ac, in lobortis nunc, montes lectus purus fermentum.
                    Ac sit wisi. Sodales aliquam, sed vestibulum nullam arcu sit risus arcu, id luctus vitae lorem nibh, integer nec nullam class cursus mi, purus arcu lectus. Vel ante suscipit volutpat potenti mattis sed, wisi eu placerat aliquam erat, lectus morbi lobortis at assumenda. Consequat neque purus ipsum voluptas odio, netus vestibulum ut nec, suspendisse pellentesque nec enim in. Wisi dictum sed semper a, ipsum erat tellus habitasse est, erat sem ornare, vitae quisque ultricies. Dui sed blandit. Tempor et faucibus justo sed luctus, nec vitae vitae. Nunc nibh pede, ipsum vestibulum aenean leo ante ultricies, nam cras quis sed penatibus amet. In mauris a. Integer metus mauris tortor, et rutrum vestibulum ultricies, ut phasellus in ullamcorper ut mollit, eu justo. Cursus pretium venenatis.
                    Cras pellentesque vel sodales accumsan aenean. Feugiat metus sit nec in aliquet amet, porttitor pretium vulputate massa. Consequat ipsum luctus quisque adipiscing libero. Wisi sollicitudin. Eget vitae ac lobortis, lorem natoque vestibulum et, aliquet faucibus at morbi nibh, vel condimentum. Massa unde orci sed id sed, odio donec congue nec praesent amet. Hymenaeos velit lacus, quis vivamus libero tempus duis, eu nisi eu, ipsum at accumsan pede justo morbi donec, massa et libero sit risus neque tortor. Ut sed sed etiam hendrerit dapibus, quis metus suspendisse nibh.
                    Fringilla tempor felis augue magna. Cum arcu a, id vitae. Pellentesque pharetra in cras sociis adipiscing est. Nibh nec mattis at maecenas, nisl orci aliquam nulla justo egestas venenatis, elementum duis vel porta eros, massa vitae, eligendi imperdiet amet. Nec neque luctus suscipit, justo sem praesent, ut nisl quisque, volutpat torquent wisi tellus aliquam reprehenderit, curabitur cras at quis massa porttitor mauris. Eros sed ultrices. Amet dignissim justo urna feugiat mauris litora, etiam accumsan, lobortis a orci suspendisse. Semper ac mauris, varius bibendum pretium, orci urna nunc ullamcorper auctor, saepe sem integer quam, at feugiat egestas duis. Urna ligula ante. Leo elementum nonummy. Sagittis mauris est in ipsum, nulla amet non justo, proin id potenti platea posuere sit ut, nunc sit erat bibendum. Nibh id auctor, ab nulla vivamus ultrices, posuere morbi nunc tellus gravida vivamus.
                    Mauris nec, facilisi quam fermentum, ut mauris integer, orci tellus tempus diam ut in pellentesque. Wisi faucibus tempor et odio leo diam, eleifend quis integer curabitur sit scelerisque ac, mauris consequat luctus quam penatibus fringilla dis, vitae lacus in, est eu ac tempus. Consectetuer amet ipsum amet dui, sed blandit id sed. Tellus integer, dignissim id pede sodales quis, felis dolorem id mauris orci, orci tempus ut. Nullam hymenaeos. Curabitur in a, tortor ut praesent placerat tincidunt interdum, ac dignissim metus nonummy hendrerit wisi, etiam ut.
                    Semper praesent integer fusce, tortor suspendisse, augue ligula orci ante asperiores ullamcorper. In sit per mi sed sed, mi vestibulum mus nam, morbi mauris neque vitae aliquam proin senectus. Ac amet arcu mollis ante congue elementum, inceptos eget optio quam pellentesque quis lobortis, sollicitudin sed vestibulum sollicitudin, lectus parturient nullam, leo orci ligula ultrices. At tincidunt enim, suspendisse est sit sem ac. Amet tellus molestie est purus magna augue, non etiam et in wisi id. Non commodo, metus lorem facilisi lobortis ac velit, montes neque sed risus consectetuer fringilla dolor. Quam justo et integer aliquam, cursus nulla enim orci, nam cursus adipiscing, integer torquent non, fringilla per maecenas. Libero ipsum sed tellus purus et. Duis molestie placerat erat donec ut. Dolor enim erat massa faucibus ultrices in, ante ultricies orci lacus, libero consectetuer mauris magna feugiat neque dapibus, donec pretium et. Aptent dui, aliquam et et amet nostra ligula.
                    Augue curabitur duis dui volutpat, tempus sed ut pede donec. Interdum luctus, lectus nulla aenean elit, id sit magna, vulputate ultrices pellentesque vel id fermentum morbi. Tortor et. Adipiscing augue lorem cum non lacus, rutrum sodales laoreet duis tortor, modi placerat facilisis et malesuada eros ipsum, vehicula tempus. Ac vivamus amet non aliquam venenatis lectus, sociosqu adipiscing consequat nec arcu odio. Blandit orci nec nec, posuere in pretium, enim ut, consectetuer nullam urna, risus vel. Nullam odio vehicula massa sed, etiam sociis mauris, lacus ullamcorper, libero imperdiet non sodales placerat justo vehicula. Nec morbi imperdiet. Fermentum sem libero iaculis bibendum et eros, eget maecenas non nunc, ad pellentesque. Ut nec diam elementum interdum. Elementum vitae tellus lacus vitae, ipsum phasellus, corporis vehicula in ac sed massa vivamus, rutrum elit, ultricies metus volutpat.
                    Semper wisi et, sollicitudin nunc vestibulum, cursus accumsan nunc pede tempus mi ipsum, ligula sed. Non condimentum ac dolor sit. Mollis eu aliquam, vel mattis mollis massa ut dolor ante, tempus lacinia arcu. Urna vestibulum lorem, nulla fermentum, iaculis ut congue ac vivamus. Nam libero orci, pulvinar nulla, enim pellentesque consectetuer leo, feugiat rhoncus rhoncus vel. Magna sociosqu donec, dictum cursus ullamcorper viverra. Ultricies quis orci lorem, suspendisse ut vestibulum integer, purus sed lorem pulvinar habitasse turpis.
                    +`
    }
  },
  watch: {
    username () {
      !this.isReseting && !this.usernameHasError && this.checkUsernameExisted()
    }
  },
  methods: {
    async checkUsernameExisted () {
      this.usernameExistedChecked = false
      let { error } = await this.$api.getUserInfo(this.username)
      this.usernameExisted = !!error
      this.usernameExistedChecked = true
      if (this.usernameExisted) {
        this.errorMessage = this.usernameHasError
          ? ''
          : '* 已存在的用戶名稱'
      } else {
        this.errorMessage = ''
      }
    },
    validate (value) {
      let rules = this.rules
      let message = ''
      let hasError = false
      if (!rules.required(value)) {
        message = '* 必填'
      } else if (!rules.min(value)) {
        message = '* 長度最少為 8 個字元'
      } else if (!rules.max(value)) {
        message = '* 長度最多為 30 個字元'
      } else if (!rules.ascii(value)) {
        message = '* 內容必須是 ascii 字元'
      }
      hasError = !!message
      return !hasError || message
    },
    checkUsername (value) {
      let result = this.validate(value)
      this.usernameHasError = typeof result === 'string'
      !this.isReseting && !this.usernameHasError && this.checkUsernameExisted()
      return result
    },
    checkPassword (value) {
      let result = this.validate(value)
      this.passwordHasError = typeof result === 'string'
      return result
    },
    async register () {
      if (!this.isLoading) {
        this.isLoading = true
        let { error } = await this.$api.register(this.username, this.password)
        this.isLoading = false
        if (error) {
          this.showFailedDialog = true
          this.currentStep = 1
        } else {
          this.$emit('registered')
          this.reset()
        }
      }
    },
    nextStep () {
      this.currentStep += 1
    },
    previousStep () {
      this.currentStep -= 1
    },
    reset () {
      this.isReseting = true
      this.currentStep = 1
      this.username = ''
      this.usernameHasError = false
      this.usernameExisted = false
      this.usernameExistedChecked = false
      this.errorMessage = ''
      this.password = ''
      this.passwordHasError = false
      this.showPassword = false
      this.showFailedDialog = false
      this.agree = false
      this.isLoading = false
      this.$refs.username.onBlur()
      this.$refs.password.onBlur()
      this.$refs.username.reset()
      this.$refs.password.reset()
      this.isReseting = false
    }
  }
}
</script>
