<script>
  export let posts
  
  const apps = [
    {
      icon: "/logos/madeit.png",
      title: "메이드잇",
      description: "커뮤니티형 습관 형성 앱",
      address: [],
      date: Date.now(),
    },
    {
      icon: "/logos/michelin_road.png",
      title: "맛집 별점",
      description: "맛집 리뷰 기록 앱",
      address: [
        {
          label: "앱스토어",
          href: "https://apps.apple.com/app/id1620131140"
        },
        {
          label: "플레이스토어",
          href: "https://play.google.com/store/apps/details?id=com.codersproduct.michelin_road&hl=ko",
        }
      ],
      date: "2022-06-08"
    },
    {
      icon: "/logos/album.png",
      title: "추억보관함",
      description: "공유 앨범 앱",
      address: [
        {
          label: "앱스토어",
          href: "https://apps.apple.com/app/id1620131140",
        },
        {
          label: "플레이스토어",
          href: "https://play.google.com/store/apps/details?id=com.codersproduct.album&hl=ko",
        }
      ],
      date: "2022-05-29"
    },
    {
      icon: "/logos/budget.png",
      title: "진수의 가계부",
      description: "지출 내역 기록 앱",
      address: [
        {
          label: "앱스토어",
          href: "https://apps.apple.com/app/id1614177059"
        },
        {
          label: "플레이스토어",
          href: "https://play.google.com/store/apps/details?id=com.codersproduct.jinsusbudget&hl=ko",
        }
      ],
      date: "2022-03-16"
    },
    {
      icon: "/logos/dotory.png",
      title: "도토리",
      description: "인공지능 동화 창작 보조 앱",
      address: [],
      date: "2022-01-30"
    },
    {
      icon: "/logos/bogobogo.png",
      title: "보고보고",
      description: "연극 및 뮤지컬 좌석 리뷰 앱",
      address: [
        {
          label: "앱스토어",
          href: "https://apps.apple.com/app/id1592022957",
        },
        {
          label: "플레이스토어",
          href: "https://play.google.com/store/apps/details?id=com.curiouser.bogobogo&hl=ko",
        }
      ],
      date: "2021-11-20"
    },
    {
      icon: "/logos/upbit.png",
      title: "빗비더",
      description: "업비트 자동 매수 프로그램",
      address: [],
      date: "2021-10-20"
    },
    {
      icon: "/logos/shopper.png",
      title: "퍼스널쇼퍼",
      description: "개인 스타일리스트 매칭 앱",
      address: [
        {
          label: "웹사이트",
          href: "https://yourpersonalshoppers.com"
        }
      ],
      date: "2021-08-16"
    },
    {
      icon: "/logos/theater.png",
      title: "Theater.io",
      description: "좌석 배치도 그리기 앱",
      address: [
        {
          label: "웹사이트",
          href: "https://theater-editor.vercel.app"
        }
      ],
      date: "2021-07-01"
    },
  ]

  const items = [
    ...apps.map((e) => ({
      type: "app",
      ...e
    })),
    ...posts.map((e) =>({
      type: "post",
      ...e
    })),
  ].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    if (dateA < dateB) {
      return 1
    }

    if (dateA > dateB) {
      return -1
    }

    return 0
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${year}.${month.toString().padStart(2, "0")}.${day.toString().padStart(2, "0")}`
  }
</script>

<ol>
  {#each items as { type, ...item }}
  <li>
    <time>{formatDate(item.date)}</time>
    <div class="body {type}">
      {#if type === "app"}
        <img class="icon" src={item.icon} alt="app-icon" />
        <div>
          <h3>{item.title}</h3> 
          <p>{item.description}</p>
          <address>
            {#each item.address as { label, href}}
              <a href={href} target="_blank">{label}</a>
            {/each}
          </address>
        </div>
      {:else if type === "post"}
          <h3>
            <a href={item.href}>
              {item.title}
            </a>
          </h3> 
        {#if item.description}
          <p>{item.description}</p>
        {/if}
    {/if}
    </div>
  </li>
  {/each}
</ol>

<style>
  ol {
    list-style: none;
  }

  li {
    display: flex;
  }

  li + li {
    margin-top: 16px;
  }

  h3 {
    margin: 0;

    font-size: 1rem;
  }

  p {
    margin: 0;

  }

  .icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    border: 1px solid rgb(238, 238, 238);

    margin-right: 16px;
  }

  .body {
    flex: 1;
  }

  .body.app {
    display: flex;
  }

  address a + a::before {
    content: " · ";
  }

  time {
    margin-right: 16px;

    line-height: 1.25;
  }
</style> 