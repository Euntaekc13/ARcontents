<script>
import { required, email, max, numeric, confirmed, min } from "vee-validate/dist/rules";
import { ValidationProvider, extend, ValidationObserver } from "vee-validate"; // vee-validate 로 부터 사용할 기능 import

// 필수 항목
extend("required", {
  ...required,
  message: "{_field_} 항목을 입력해 주세요.",
});
extend("required-select", {
  ...required,
  message: "{_field_} 항목을 선택해 주세요.",
});

// 이메일
extend("email", {
  ...email,
  message: "이메일 형식이 올바르지 않습니다.",
});

// 최대 자릿수
extend("max", {
  ...max,
  message: "{_field_} 항목을 {length}자 이하로 입력해 주세요.",
});

// 최소 자릿수
extend("min", {
  ...min,
  message: "{_field_} 항목을 {length}자 이상으로 입력해 주세요.",
});

//정수 입력
extend("numeric", {
  ...numeric,
  message: "{_field_} 항목을 정수로 입력해 주세요.",
});

// 비밀번호
extend("confirmed", {
  ...confirmed,
  message: "비밀번호가 맞지 않습니다.",
});

extend("comment", {
  ...required,
  message: "{_field_}을 입력해 주세요.",
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
};
</script>
