<script lang="ts">
  const year = new Date().getFullYear()
</script>

<footer>
    <p>© { year } 오진수.</p>
    <address>
      <a class="email" href="mailto:ohjinsu@codersproduct.com">
        ohjinsu@codersproduct.com
      </a>
      <a class="portfolio" href="https://github.com/oh-jinsu" target="_blank">
        https://github.com/oh-jinsu
      </a>
      <!-- <a class="office" href="https://codersproduct.com" target="_blank">
        https://codersproduct.com
      </a> -->
    </address>
</footer>

<style>
  footer {
    display: flex;
    
    flex-direction: column;
    
    align-items: center;
    
    width: 100%;

    border-top: 1px solid var(--tertiary-color);

    padding-bottom: 16px;
  }

  footer>* {
    max-width: var(--screen-width);
		
		width: 100%;

    padding: 0 16px;
  }

  address {
    display: flex;

    flex-direction: column;
  }

  address>* {
    width: fit-content;
  }

  .email::before {
    content: "📪 ";
  }

  .portfolio::before {
    content: "💼 ";
  }

  .office::before {
    content: "🏢 ";
  }
</style>
