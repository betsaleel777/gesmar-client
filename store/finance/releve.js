/* eslint-disable no-empty-pattern */

export const actions = {
  async getReleve({}, payload) {
    const requete = await this.$axios.get('api/finances/paiements/releve', { params: payload })
    return requete.data
  },
}
