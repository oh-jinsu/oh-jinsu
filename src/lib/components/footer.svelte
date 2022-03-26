<script lang="ts">
  const year = new Date().getFullYear()
</script>

<footer>
  <div class="inner">
    <p>© { year } 오진수.</p>
  </div>
</footer>

<style>
  footer {
    display: flex;
    
    justify-content: center;
    
    width: 100%;

    border-top: 1px solid var(--tertiary-color);
  }

  .inner {
    max-width: var(--screen-width);
		
		width: 100%;

    padding: 0 16px;
  }
</style>