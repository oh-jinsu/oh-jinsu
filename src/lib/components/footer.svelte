<script lang="ts">
  const year = new Date().getFullYear()
</script>

<footer>
  <p>© { year } 오진수.</p>
</footer>

<style>
  footer {
    display: flex;
    
    flex-direction: column;
    
    align-items: center;
    
    width: 100%;
  }

  footer>* {
    max-width: var(--screen-width);
		
		width: 100%;

    padding: 0 16px;
  }
</style>
