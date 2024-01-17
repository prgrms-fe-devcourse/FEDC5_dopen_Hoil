# Dopen
커뮤니티 사이트. (프로그래머스 데브코스 5기 과제에서 제공해주신 API를 이용한)

# 프로젝트 소개
회고 기록 + 타이머 기능이 존재하는 커뮤니티 사이트입니다.

[배포 URL](https://fedc-5-dopen-hoil.vercel.app/)

# 개발 기간
23년 12월 22일(금) ~ 24년 1월 17일(수)

### 멤버 구성 <!-- 각자 개발하신 파트 + 맡으신 직무 적어주시면 됩니다 -->
- 팀장 : 김영현. [자주쓰이는 공통컴포넌트](https://github.com/prgrms-fe-devcourse/FEDC5_dopen_Hoil/issues/7) 제작, 잔디, 타이머, 컴포넌트 제작, 회고작성 페이지, chakra-ui이용한 다크모드 세팅, 배포
- 문서(노션) : 안재현.
- 아이디어, 발표 : 이종혁
- 디자인 : 조승현

### 개발 환경

- chakra-ui + emotion
- vite
- react
- ts
- storybook
- axios
- eslint + prettier + husky

버전은 아래 명시되어있습니다
```
├── @chakra-ui/icons@2.1.1
├── @chakra-ui/react@2.8.2
├── @chakra-ui/storybook-addon@5.1.0
├── @chakra-ui/theme-tools@2.1.2
├── @emotion/react@11.11.3
├── @emotion/styled@11.11.0
├── @fontsource/noto-sans-kr@5.0.17
├── @storybook/addon-essentials@7.6.6
├── @storybook/addon-interactions@7.6.6
├── @storybook/addon-links@7.6.6
├── @storybook/addon-onboarding@1.0.10
├── @storybook/blocks@7.6.6
├── @storybook/react-vite@7.6.6
├── @storybook/react@7.6.6
├── @storybook/test@7.6.6
├── @types/node@20.10.6
├── @types/react-dom@18.2.18
├── @types/react@18.2.46
├── @typescript-eslint/eslint-plugin@6.16.0
├── @typescript-eslint/parser@6.16.0
├── @vitejs/plugin-react@4.2.1
├── axios@1.6.3
├── eslint-config-prettier@9.1.0
├── eslint-plugin-prettier@5.1.2
├── eslint-plugin-react-hooks@4.6.0
├── eslint-plugin-react-refresh@0.4.5
├── eslint-plugin-react@7.33.2
├── eslint@8.56.0
├── framer-motion@10.16.16
├── husky@8.0.3
├── lint-staged@15.2.0
├── prettier@3.1.1
├── react-dom@18.2.0
├── react-error-boundary@4.0.12
├── react-hook-form@7.49.2
├── react-icons@4.12.0
├── react-query@3.39.3
├── react-router-dom@6.21.1
├── react@18.2.0
├── storybook-addon-react-router-v6@2.0.10
├── storybook@7.6.6
├── typescript@5.3.3
├── vite@5.0.10
├── vitest@1.1.1
```

# 주요 기능 <!-- 기능에 대한 설명을 적어주세요 -->
### 로그인&회원가입
### 게시판
### 마이페이지
### 포스트&좋아요&댓글
### 메시지
### 알림
### 검색
### 실시간 접속자
### 타이머 & 잔디
원하는만큼 타이머를 설정하고 재생, 멈춤이 가능합니다. 제한시각인 23:45 전까지 가능합니다.
react-hook-form을 이용하여 validation 하였습니다
![image](https://github.com/prgrms-fe-devcourse/FEDC5_dopen_Hoil/assets/87127340/9190df5f-d242-4fcd-9e5f-afaac2c89433) ![image](https://github.com/prgrms-fe-devcourse/FEDC5_dopen_Hoil/assets/87127340/bda197e5-fc17-4e1d-a535-86dd309ea940)

인증된 사용자가 타이머를 사용하여 최소한 1초라도 기록하였다면 당일 잔디가 심어집니다. 기준은 임시지만 4시간 단위로 분리해두었습니다. 
시간이 지날수록 색이 진해집니다.

![image](https://github.com/prgrms-fe-devcourse/FEDC5_dopen_Hoil/assets/87127340/1cce5eb7-0b9e-45bf-ba4b-2358a7807379) ![image](https://github.com/prgrms-fe-devcourse/FEDC5_dopen_Hoil/assets/87127340/99d1ec1e-4d87-497c-bd19-f5d604fc9437)

### 다크모드

chakra-ui의 sementicToken + colorMode를 이용하여 다크모드를 처리하였습니다.

![image](https://github.com/prgrms-fe-devcourse/FEDC5_dopen_Hoil/assets/87127340/aaef4053-052c-4f17-86d6-7a6550dc6c35) ![image](https://github.com/prgrms-fe-devcourse/FEDC5_dopen_Hoil/assets/87127340/48a6b1bc-0622-40ef-a2c9-8296ff981e60)


### D-day

인증된 사용자는 자신만의 D-day를 등록할 수 있습니다

### 추가할 거 있으시면 더 추가해주세요

# 라이센스

