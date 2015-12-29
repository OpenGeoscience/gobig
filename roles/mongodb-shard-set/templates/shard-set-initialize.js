
{% for shard in shards %}
{% if (shard|length) == 2 %}
{%- set group = shard[0] %}
{%- set name  = shard[1] %}
{%- set db    = (groups[group] | mongodb_url(hostvars,
                                             mongodb_net_interface,
                                             27017,
                                             name)) %}
{% else %}
{%- set host = shard[0] %}
{%- set db   = ([host] | mongodb_url(hostvars,
                                     mongodb_net_interface,
                                     27017,
                                     "")) %}
{% endif %}
sh.addShard("{{ db }}");
{% endfor %}

sh.waitForBalancer();

